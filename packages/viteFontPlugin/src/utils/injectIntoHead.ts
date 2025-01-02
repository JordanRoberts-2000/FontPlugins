export default function injectIntoHead(html: string, content: string): string {
  return html.replace("</head>", `${content}</head>`);
}
