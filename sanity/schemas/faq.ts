export const faq = {
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    { name: "question", title: "Question", type: "string", validation: (r: { required: () => unknown }) => r.required() },
    { name: "answer", title: "Answer", type: "text", rows: 4, validation: (r: { required: () => unknown }) => r.required() },
  ],
};
