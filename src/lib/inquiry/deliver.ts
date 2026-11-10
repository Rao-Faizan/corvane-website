import "server-only";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

import { inquiryTypes, type Inquiry } from "./schema";

/**
 * Delivery channels for inquiries. A submission counts as received only if
 * at least one configured channel succeeds — otherwise the API returns an
 * error and the user is told the message was NOT sent.
 *
 *  - Resend:  RESEND_API_KEY + INQUIRY_TO_EMAIL + INQUIRY_FROM_EMAIL
 *  - File:    INQUIRY_LOG_FILE (JSON Lines; useful as a VPS backup and in development)
 */

export interface DeliveryResult {
  delivered: boolean;
  channels: { name: "resend" | "file"; ok: boolean; error?: string }[];
}

export function configuredChannels(): ("resend" | "file")[] {
  const channels: ("resend" | "file")[] = [];
  if (process.env.RESEND_API_KEY && process.env.INQUIRY_TO_EMAIL && process.env.INQUIRY_FROM_EMAIL) {
    channels.push("resend");
  }
  if (process.env.INQUIRY_LOG_FILE) channels.push("file");
  return channels;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function typeLabel(value: Inquiry["inquiryType"]): string {
  return inquiryTypes.find((t) => t.value === value)?.label ?? value;
}

export function buildEmail(inquiry: Inquiry, productName: string | null) {
  const rows: [string, string][] = [
    ["Name", inquiry.fullName],
    ["Email", inquiry.email],
    ["Company", inquiry.company],
    ["Phone", inquiry.phone || "—"],
    ["Country", inquiry.country],
    ["Inquiry type", typeLabel(inquiry.inquiryType)],
    ["Product", productName ?? "Not specified"],
  ];
  const subject = `[Website] ${typeLabel(inquiry.inquiryType)} — ${inquiry.company}`.slice(0, 180);
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${inquiry.message}`;
  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="color:#667085;vertical-align:top">${escapeHtml(k)}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`,
    )
    .join("")}</table><p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(
    inquiry.message,
  )}</p>`;
  return { subject, text, html };
}

async function sendViaResend(inquiry: Inquiry, productName: string | null): Promise<void> {
  const { subject, text, html } = buildEmail(inquiry, productName);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.INQUIRY_FROM_EMAIL,
      to: process.env.INQUIRY_TO_EMAIL!.split(",").map((s) => s.trim()),
      reply_to: inquiry.email,
      subject,
      text,
      html,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend responded ${res.status}: ${body.slice(0, 200)}`);
  }
}

async function appendToFile(inquiry: Inquiry, productName: string | null): Promise<void> {
  const file = path.resolve(process.env.INQUIRY_LOG_FILE!);
  await mkdir(path.dirname(file), { recursive: true });
  const record = { receivedAt: new Date().toISOString(), ...inquiry, productName };
  await appendFile(file, `${JSON.stringify(record)}\n`, "utf8");
}

export async function deliverInquiry(inquiry: Inquiry, productName: string | null): Promise<DeliveryResult> {
  const channels = configuredChannels();
  const results = await Promise.all(
    channels.map(async (name) => {
      try {
        if (name === "resend") await sendViaResend(inquiry, productName);
        else await appendToFile(inquiry, productName);
        return { name, ok: true };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`[inquiry] delivery via ${name} failed:`, message);
        return { name, ok: false, error: message };
      }
    }),
  );
  return { delivered: results.some((r) => r.ok), channels: results };
}
