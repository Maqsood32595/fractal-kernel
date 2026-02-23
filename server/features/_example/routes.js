const express = require('express');
const router = express.Router();
const service = require('./service');

// GET /api/example
router.get('/', (req, res) => {
    res.json(service.getExample());
});

// GET /api/example/:id
router.get('/:id', (req, res) => {
    res.json({ id: req.params.id, message: 'Item fetched successfully' });
});

// POST /api/example
router.post('/', (req, res) => {
    const result = service.createExample(req.body);
    res.status(201).json(result);
});

module.exports = router;
