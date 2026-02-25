const express = require('express');
const path = require('path');
const kernel = require('./kernel');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve the client/ frontend — accessible at http://localhost:3000
// API routes at /api/* take priority over static files (declared after boot)
const clientDir = path.resolve(__dirname, '../client');
app.use(express.static(clientDir));

// Boot the Kernel — discovers and mounts all backend features automatically
kernel.boot(app, './features').then(() => {

    // Built-in: expose feature list for the frontend nav and admin UI
    app.get('/api/features', (req, res) => {
        const features = kernel.getAllFeatures().map(f => ({
            id: f.id,
            name: f.name,
            description: f.description || '',
            basePath: f.basePath,
            enabled: f.enabled !== false,
            loaded: f.loaded,
            version: f.version || '1.0.0'
        }));
        res.json({ count: features.length, features });
    });

    // Fallback: serve index.html for any non-API route (SPA support)
    app.get('*', (req, res) => {
        if (!req.path.startsWith('/api/')) {
            res.sendFile(path.join(clientDir, 'index.html'));
        }
    });

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
        console.log(`Frontend:      http://localhost:${PORT}`);
        console.log(`Feature API:   http://localhost:${PORT}/api/features\n`);
    });
});
