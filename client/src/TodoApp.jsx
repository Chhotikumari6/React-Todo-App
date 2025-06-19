import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Check, X, Edit2, Save } from 'lucide-react';

// Functional Component using ES6 Arrow Function
const TodoApp = () => {
  // useState Hook - ES6 Destructuring Assignment
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [filter, setFilter] = useState('all');

  // useEffect Hook for component lifecycle
  useEffect(() => {
    // Load todos from memory (simulating localStorage behavior)
    const savedTodos = [
      { id: 1, text: 'Learn React Basics', completed: true },
      { id: 2, text: 'Understand Virtual DOM', completed: false },
      { id: 3, text: 'Practice ES6 Features', completed: false }
    ];
    setTodos(savedTodos);
  }, []); // Empty dependency array - runs once on mount

  // ES6 Arrow Functions
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(), // Simple ID generation
        text: inputValue,
        completed: false
      };
      // ES6 Spread Operator
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  // ES6 Arrow Function with implicit return
  const deleteTodo = (id) => todos.filter(todo => todo.id !== id);

  const toggleComplete = (id) => {
    // ES6 Map method with arrow function
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditValue(text);
  };

  const saveEdit = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editValue } : todo
    ));
    setEditingId(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  // ES6 Destructuring and Filter methods
  const getFilteredTodos = () => {
    const { all, active, completed } = {
      all: todos,
      active: todos.filter(todo => !todo.completed),
      completed: todos.filter(todo => todo.completed)
    };
    return { all, active, completed }[filter];
  };

  // Event handler using ES6 arrow function
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const handleEditKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      saveEdit(id);
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  // ES6 Destructuring in function parameters
  const TodoItem = ({ todo }) => (
    <div className={`flex items-center justify-between p-4 border-b border-gray-200 transition-all duration-200 ${
      todo.completed ? 'bg-gray-50 opacity-75' : 'bg-white hover:bg-gray-50'
    }`}>
      <div className="flex items-center space-x-3 flex-1">
        <button
          onClick={() => toggleComplete(todo.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            todo.completed 
              ? 'bg-green-500 border-green-500 text-white' 
              : 'border-gray-300 hover:border-green-400'
          }`}
        >
          {todo.completed && <Check size={14} />}
        </button>
        
        {editingId === todo.id ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => handleEditKeyPress(e, todo.id)}
            className="flex-1 px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoFocus
          />
        ) : (
          <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {todo.text}
          </span>
        )}
      </div>
      
      <div className="flex space-x-2">
        {editingId === todo.id ? (
          <>
            <button
              onClick={() => saveEdit(todo.id)}
              className="p-1 text-green-600 hover:bg-green-100 rounded"
            >
              <Save size={16} />
            </button>
            <button
              onClick={cancelEdit}
              className="p-1 text-gray-600 hover:bg-gray-100 rounded"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => startEdit(todo.id, todo.text)}
              className="p-1 text-blue-600 hover:bg-blue-100 rounded"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => setTodos(deleteTodo(todo.id))}
              className="p-1 text-red-600 hover:bg-red-100 rounded"
            >
              <Trash2 size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );

  const filteredTodos = getFilteredTodos();
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  // JSX Return - React's syntax extension
  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
        <h1 className="text-3xl font-bold text-center">React Todo App</h1>
        <p className="text-center mt-2 opacity-90">
          Demonstrating Functional Components & ES6 Features
        </p>
      </div>

      {/* Add Todo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
          <button
            onClick={addTodo}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <PlusCircle size={20} />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex justify-center space-x-1">
          {/* ES6 Template Literals and Array Methods */}
          {['all', 'active', 'completed'].map(filterType => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                filter === filterType
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {filterType}
            </button>
          ))}
        </div>
        <div className="text-center mt-2 text-sm text-gray-600">
          {completedCount} of {totalCount} tasks completed
        </div>
      </div>

      {/* Todo List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredTodos.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <div className="text-4xl mb-4">📝</div>
            <p>No todos {filter !== 'all' ? `in ${filter}` : 'yet'}!</p>
            {filter !== 'all' && (
              <button
                onClick={() => setFilter('all')}
                className="mt-2 text-blue-500 hover:underline"
              >
                View all todos
              </button>
            )}
          </div>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))
        )}
      </div>

      {/* Footer with ES6 Info */}
      <div className="p-4 bg-gray-50 text-center text-sm text-gray-600">
        <p>Built with React Functional Components, Hooks, and ES6+ Features</p>
      </div>
    </div>
  );
};

export default TodoApp;