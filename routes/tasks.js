const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

// api/tasks

// Create task
router.post('/', 
auth,
[check('taskName', 'El nombre de la tarea es obligatorio').not().isEmpty()],
[check('projectId', 'El proyecto es obligatorio').not().isEmpty()],
taskController.create);

// Project tasks list
router.get('/', 
auth,
[check('projectId', 'El proyecto es obligatorio').not().isEmpty()],
taskController.list);

// Update task
router.put('/:id', 
auth,
[check('taskName', 'El nombre de la tarea es obligatorio').not().isEmpty()],
[check('projectId', 'El proyecto es obligatorio').not().isEmpty()],
taskController.update);

// Destroy task
router.delete('/:id', 
auth,
[check('projectId', 'El proyecto es obligatorio').not().isEmpty()],
taskController.destroy);

module.exports = router;