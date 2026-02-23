/**
 * Example Service
 *
 * Business logic belongs here — not in routes.js.
 * routes.js handles HTTP. service.js handles work.
 *
 * This separation keeps the feature testable and the routes clean.
 */

function getExample() {
    return {
        message: 'Fractal Kernel is working.',
        tip: 'Copy this folder to server/features/your-feature/ to add a new feature.',
        docs: 'Read AI_RULES.md before asking an AI agent to add features.'
    };
}

function createExample(body) {
    // Replace with real logic
    return { created: true, received: body };
}

module.exports = { getExample, createExample };
