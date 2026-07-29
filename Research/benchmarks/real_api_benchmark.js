/**
 * Fractal Kernel Real API Benchmark Suite
 * Uses Gemini API to measure actual token counts per task
 * Author: Mohammed Maqsood L
 */

const https = require('https');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) { console.error('[!] Set GEMINI_API_KEY environment variable before running.'); process.exit(1); }
const GEMINI_MODEL = 'gemini-2.0-flash';

const FEATURES = [
  'auth', 'payments', 'users', 'notifications', 'analytics',
  'billing', 'search', 'webhooks', 'uploads', 'audit',
  'subscriptions', 'invites', 'settings', 'reports', 'permissions'
];

// Call Gemini countTokens API to get real token count for a prompt
function countTokensAPI(promptText) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      contents: [{ parts: [{ text: promptText }] }]
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/${GEMINI_MODEL}:countTokens?key=${GEMINI_API_KEY}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.totalTokens) {
            resolve(parsed.totalTokens);
          } else {
            reject(new Error(`API Error: ${JSON.stringify(parsed)}`));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// Monolith context text at feature step K
function buildMonolithContext(featureCount) {
  let routesIndex = `// Central Routes Index Registration File\nconst express = require('express');\nconst router = express.Router();\n`;
  let controllersText = '';
  let servicesText = '';

  for (let i = 0; i < featureCount; i++) {
    const f = FEATURES[i];
    routesIndex += `const ${f}Controller = require('../controllers/${f}.controller');\n`;
    routesIndex += `router.use('/api/v1/${f}', ${f}Controller);\n`;
    controllersText += `\n// Controller: ${f}\nexports.get${f} = async (req, res) => {\n  const data = await require('../services/${f}.service').fetchData(req.query);\n  res.json({ success: true, feature: '${f}', data });\n};\n`;
    servicesText += `\n// Service: ${f}\nexports.fetchData = async (params) => {\n  return { timestamp: Date.now(), feature: '${f}', status: 'active', params };\n};\n`;
  }

  return `You are an AI coding agent. You must add a new endpoint to the feature '${FEATURES[featureCount - 1]}'. Inspect the codebase below to avoid conflicts with existing global routes.\n\n${routesIndex}\n${controllersText}\n${servicesText}`;
}

// Fractal Kernel context text (scoped to single feature slice)
function buildFractalContext(featureName) {
  const manifest = JSON.stringify({ name: featureName, version: "1.0.0", enabled: true, routes: { prefix: `/api/v1/${featureName}`, file: "./routes.js" }, dependencies: [] }, null, 2);
  const routes = `const express = require('express');\nconst router = express.Router();\nconst service = require('./service');\nrouter.get('/', async (req, res) => {\n  const data = await service.fetchData(req.query);\n  res.json({ success: true, feature: '${featureName}', data });\n});\nmodule.exports = router;\n`;
  const service = `exports.fetchData = async (params) => {\n  return { timestamp: Date.now(), feature: '${featureName}', status: 'active', params };\n};\n`;

  return `You are an AI coding agent. Your file visibility is STRICTLY restricted to: features/${featureName}/*\nDo NOT touch kernel.js or index.js.\n\nfeature.manifest.json:\n${manifest}\n\nroutes.js:\n${routes}\nservice.js:\n${service}`;
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function runRealApiBenchmark() {
  console.log("==========================================================================");
  console.log(" FRACTAL KERNEL — REAL GEMINI API BENCHMARK (15 SEQUENTIAL TASKS)");
  console.log("==========================================================================\n");

  const results = [];
  let totalMono = 0;
  let totalFk = 0;

  console.log("Task # | Feature       | Monolith Tokens | Fractal Tokens | Token Delta");
  console.log("-------+---------------+-----------------+----------------+------------");

  for (let i = 0; i < FEATURES.length; i++) {
    const feature = FEATURES[i];
    const taskNum = i + 1;

    const monoPrompt = buildMonolithContext(taskNum);
    const fkPrompt = buildFractalContext(feature);

    let monoTokens, fkTokens;
    try {
      monoTokens = await countTokensAPI(monoPrompt);
      await sleep(300); // avoid rate limits
      fkTokens = await countTokensAPI(fkPrompt);
      await sleep(300);
    } catch (err) {
      console.error(`[!] API error at task ${taskNum}: ${err.message}`);
      process.exit(1);
    }

    totalMono += monoTokens;
    totalFk += fkTokens;

    const delta = (((monoTokens - fkTokens) / monoTokens) * 100).toFixed(1);
    results.push({ task: taskNum, feature, monoTokens, fkTokens, reductionPercent: parseFloat(delta) });

    console.log(
      `  ${taskNum.toString().padStart(2)} | ${feature.padEnd(13)} | ${monoTokens.toLocaleString().padStart(15)} | ${fkTokens.toLocaleString().padStart(14)} |    -${delta}%`
    );
  }

  const avgMono = Math.round(totalMono / FEATURES.length);
  const avgFk = Math.round(totalFk / FEATURES.length);
  const overallDelta = (((avgMono - avgFk) / avgMono) * 100).toFixed(1);
  const peakMono = results[results.length - 1].monoTokens;
  const peakFk = results[results.length - 1].fkTokens;

  console.log("\n==========================================================================");
  console.log("                     REAL API BENCHMARK SUMMARY                          ");
  console.log("==========================================================================");
  console.log(`Average Prompt Tokens / Task : Monolith = ${avgMono.toLocaleString()} | Fractal Kernel = ${avgFk.toLocaleString()} (${overallDelta}% Reduction)`);
  console.log(`Peak Context Token Window    : Monolith = ${peakMono.toLocaleString()} | Fractal Kernel = ${peakFk.toLocaleString()}`);
  console.log("==========================================================================\n");

  const output = { model: GEMINI_MODEL, avgMonolithTokens: avgMono, avgFractalTokens: avgFk, tokenReductionPercent: parseFloat(overallDelta), peakMonolithTokens: peakMono, peakFractalTokens: peakFk, tasks: results };
  require('fs').writeFileSync('real_api_benchmark_results.json', JSON.stringify(output, null, 2));
  console.log("[+] Results saved to real_api_benchmark_results.json\n");
}

runRealApiBenchmark();
