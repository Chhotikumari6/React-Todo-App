import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  // Fetch todos on mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then(res => {
        setTodos(res.data.data);
      })
      .catch(err => console.error('Error fetching todos:', err));
  }, []);

  // Handle add todo
  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    axios.post('http://localhost:5000/api/todos', { title })
      .then(res => {
        setTodos([...todos, res.data.data]);
        setTitle('');
      })
      .catch(err => console.error('Error adding todo:', err));
  };

  // Handle delete
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => console.error('Error deleting todo:', err));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Todo List</h1>

      <form onSubmit={handleAdd} style={{ marginBottom: '20px' }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.title}
            <button onClick={() => handleDelete(todo._id)} style={{ marginLeft: '10px' }}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
