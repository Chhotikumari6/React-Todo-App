const Todo = require('../models/todoModel');

// Get all todos
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching todos',
      error: error.message
    });
  }
};

// Get single todo by ID
const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching todo',
      error: error.message
    });
  }
};

// Create new todo
const createTodo = async (req, res) => {
  try {
    const { title, priority } = req.body;
    
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Todo title is required'
      });
    }
    
    const todo = await Todo.create({
      title,
      priority: priority || 'medium'
    });
    
    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: todo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating todo',
      error: error.message
    });
  }
};

// Update todo
const updateTodo = async (req, res) => {
  try {
    const { title, completed, priority } = req.body;
    
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, completed, priority },
      { new: true, runValidators: true }
    );
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Todo updated successfully',
      data: todo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating todo',
      error: error.message
    });
  }
};

// Toggle todo completion status
const toggleTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }
    
    todo.completed = !todo.completed;
    await todo.save();
    
    res.status(200).json({
      success: true,
      message: 'Todo status updated successfully',
      data: todo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error toggling todo status',
      error: error.message
    });
  }
};

// Delete todo
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting todo',
      error: error.message
    });
  }
};

// Delete all completed todos
const deleteCompletedTodos = async (req, res) => {
  try {
    const result = await Todo.deleteMany({ completed: true });
    
    res.status(200).json({
      success: true,
      message: `${result.deletedCount} completed todos deleted successfully`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting completed todos',
      error: error.message
    });
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
  deleteCompletedTodos
};