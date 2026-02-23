const express = require('express');
const kernel = require('./kernel');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Boot the Kernel — discovers and mounts all features automatically
kernel.boot(app, './features').then(() => {

    // Built-in: expose feature list for Admin UI or debugging
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

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
        console.log(`Feature list:  http://localhost:${PORT}/api/features\n`);
    });
});
