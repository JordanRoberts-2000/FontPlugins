import injectIntoHead from "./injectIntoHead.js";

export default function addPreconnectLinks(html: string): string {
  const preconnectLinks = `
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
          <link rel="preconnect" href="https://fonts.googleapis.com">`;
  return injectIntoHead(html, preconnectLinks);
}
