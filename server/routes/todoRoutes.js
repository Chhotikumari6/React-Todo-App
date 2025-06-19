const express = require('express');
const router = express.Router();
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
  deleteCompletedTodos
} = require('../controllers/todoControllers');

// @route   GET /api/todos
// @desc    Get all todos
// @access  Public
router.get('/', getAllTodos);

// @route   GET /api/todos/:id
// @desc    Get single todo by ID
// @access  Public
router.get('/:id', getTodoById);

// @route   POST /api/todos
// @desc    Create new todo
// @access  Public
router.post('/', createTodo);

// @route   PUT /api/todos/:id
// @desc    Update todo
// @access  Public
router.put('/:id', updateTodo);

// @route   PATCH /api/todos/:id/toggle
// @desc    Toggle todo completion status
// @access  Public
router.patch('/:id/toggle', toggleTodo);

// @route   DELETE /api/todos/:id
// @desc    Delete todo
// @access  Public
router.delete('/:id', deleteTodo);

// @route   DELETE /api/todos/completed/all
// @desc    Delete all completed todos
// @access  Public
router.delete('/completed/all', deleteCompletedTodos);

module.exports = router;