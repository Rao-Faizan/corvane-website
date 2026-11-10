"use client";

import { usePathname } from "next/navigation";

import { DesktopNav, type DesktopNavProps } from "./DesktopNav";
import { MobileNavigation, type MobileNavigationProps } from "./MobileNavigation";

/*
 * usePathname() is request-time data on routes with unknown params, so these
 * wrappers render inside <Suspense> (see Header). The fallback is the same
 * fully working navigation, only without the active-link state.
 */
export function RoutedDesktopNav(props: Omit<DesktopNavProps, "pathname">) {
  return <DesktopNav {...props} pathname={usePathname()} />;
}

export function RoutedMobileNavigation(props: Omit<MobileNavigationProps, "pathname">) {
  return <MobileNavigation {...props} pathname={usePathname()} />;
}
