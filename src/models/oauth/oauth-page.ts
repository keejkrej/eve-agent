function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderPage(options: { title: string; heading: string; message: string; details?: string }): string {
  const title = escapeHtml(options.title);
  const heading = escapeHtml(options.heading);
  const message = escapeHtml(options.message);
  const details = options.details ? escapeHtml(options.details) : undefined;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <style>
    :root {
      --text: #f8fafc;
      --text-dim: #94a3b8;
      --page-bg: #020617;
      --mark-bg: #f8fafc;
      --mark-text: #020617;
      --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    * { box-sizing: border-box; }
    html { color-scheme: dark; }
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 24px;
      background: var(--page-bg);
      color: var(--text);
      font-family: var(--font-sans);
      text-align: center;
    }
    main { width: 100%; max-width: 560px; }
    .mark {
      width: 64px;
      height: 64px;
      display: grid;
      place-items: center;
      margin: 0 auto 28px;
      border-radius: 16px;
      background: var(--mark-bg);
      color: var(--mark-text);
      font-size: 34px;
      font-weight: 750;
      letter-spacing: -0.08em;
    }
    h1 { margin: 0 0 10px; font-size: 28px; line-height: 1.15; font-weight: 650; }
    p { margin: 0; line-height: 1.7; color: var(--text-dim); font-size: 15px; }
    .details {
      margin-top: 16px;
      font-family: var(--font-mono);
      font-size: 13px;
      color: var(--text-dim);
      white-space: pre-wrap;
      word-break: break-word;
    }
  </style>
</head>
<body>
  <main>
    <div class="mark" aria-label="Eve Agent">e</div>
    <h1>${heading}</h1>
    <p>${message}</p>
    ${details ? `<div class="details">${details}</div>` : ""}
  </main>
</body>
</html>`;
}

export function oauthSuccessHtml(message: string): string {
  return renderPage({
    title: "Eve Agent authentication successful",
    heading: "Authentication successful",
    message,
  });
}

export function oauthErrorHtml(message: string, details?: string): string {
  return renderPage({
    title: "Eve Agent authentication failed",
    heading: "Authentication failed",
    message,
    details,
  });
}
