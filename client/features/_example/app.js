/**
 * Example Feature — Client Side
 *
 * This script self-registers with the client router.
 * It mirrors the backend feature at server/features/_example/.
 *
 * Rules:
 *  - Call window.FractalKernel.register() once with your feature id and render function.
 *  - The render function receives the page container element.
 *  - Fetch data from your backend feature's API.
 *  - Keep all UI logic for this feature in this file (or import from a sibling file).
 *
 * Copy this folder to client/features/your-feature/ to create a new feature.
 * Then add '/features/your-feature/app.js' to the featureScripts array in client/index.html.
 */

window.FractalKernel.register('example', async function render(container) {
    container.innerHTML = `
    <div style="margin-bottom: 28px;">
      <h1 style="font-size:22px; font-weight:700; margin-bottom:8px;">Example Feature</h1>
      <p style="color:#8888a0; font-size:14px;">
        This page fetches data from <code style="background:#22222e; padding:2px 6px; border-radius:4px; font-size:13px;">/api/example</code>
        on the backend and displays it here.
      </p>
    </div>
    <div id="example-result" style="
      background:#17171f;
      border:1px solid #2a2a38;
      border-radius:10px;
      padding:24px;
      font-size:14px;
      color:#8888a0;
    ">
      Fetching data...
    </div>
    <div style="margin-top:28px; padding:20px; background:#17171f; border:1px solid #2a2a38; border-radius:10px;">
      <h3 style="font-size:13px; font-weight:600; color:#7c6af7; margin-bottom:12px; text-transform:uppercase; letter-spacing:0.08em;">How to add your own feature</h3>
      <ol style="padding-left:18px; line-height:1.9; font-size:13px; color:#8888a0;">
        <li>Copy <code style="background:#22222e; padding:1px 5px; border-radius:3px;">server/features/_example/</code> → <code style="background:#22222e; padding:1px 5px; border-radius:3px;">server/features/your-feature/</code></li>
        <li>Copy <code style="background:#22222e; padding:1px 5px; border-radius:3px;">client/features/_example/</code> → <code style="background:#22222e; padding:1px 5px; border-radius:3px;">client/features/your-feature/</code></li>
        <li>Update <code style="background:#22222e; padding:1px 5px; border-radius:3px;">feature.manifest.json</code> — change id, name, basePath</li>
        <li>Write your backend logic in <code style="background:#22222e; padding:1px 5px; border-radius:3px;">service.js</code></li>
        <li>Write your frontend UI in <code style="background:#22222e; padding:1px 5px; border-radius:3px;">app.js</code> — call <code style="background:#22222e; padding:1px 5px; border-radius:3px;">FractalKernel.register('your-feature', ...)</code></li>
        <li>Add your script to the <code style="background:#22222e; padding:1px 5px; border-radius:3px;">featureScripts</code> array in <code style="background:#22222e; padding:1px 5px; border-radius:3px;">client/index.html</code></li>
        <li>Restart the server — backend auto-discovered, frontend auto-registered</li>
      </ol>
    </div>
  `;

    // Fetch from the backend feature API
    try {
        const res = await fetch('/api/example');
        const data = await res.json();
        const resultEl = document.getElementById('example-result');
        resultEl.style.color = '#e8e8f0';
        resultEl.innerHTML = `
      <div style="margin-bottom:8px; font-size:11px; text-transform:uppercase; letter-spacing:0.1em; color:#6b6b80;">Response from /api/example</div>
      <pre style="font-family:monospace; font-size:13px; line-height:1.6; white-space:pre-wrap;">${JSON.stringify(data, null, 2)}</pre>
    `;
    } catch (e) {
        document.getElementById('example-result').innerHTML =
            `<span style="color:#f87171;">Could not fetch from /api/example. Is the server running?</span>`;
    }
});
