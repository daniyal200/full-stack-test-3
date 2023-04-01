const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { createTodo, updateTodo, deleteTodo, getCompletedTodos, getIncompleteTodos } = require('../controllers/todoController');

router.route('/').get(authenticate, getCompletedTodos).post(authenticate, createTodo);
router.get('/incomplete', authenticate, getIncompleteTodos);
router.route('/:id').put(authenticate, updateTodo).delete(authenticate, deleteTodo);

module.exports = router;
