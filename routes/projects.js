const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

// api/projects
router.post('/', 
auth,
[check('projectName', 'El nombre del proyecto es obligatorio').not().isEmpty()],
projectController.create);

// User project list
router.get('/', 
auth,
projectController.list);

// Update project
router.put('/:id', 
auth,
[check('projectName', 'El nombre del proyecto es obligatorio').not().isEmpty()],
projectController.update);

// Detroy project
router.delete('/:id', 
auth,
projectController.destroy);

module.exports = router;