import React, { useState } from 'react';
import { createTask } from '../api';

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [sharedWith, setSharedWith] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = {
      title,
      description,
      due_date: dueDate,
      shared_with: sharedWith,
      status: 'pending',
    };
    try {
      const token = localStorage.getItem('token');
      const res = await createTask(taskData, token);
      addTask(res.data);
      setTitle('');
      setDescription('');
      setDueDate('');
      setSharedWith('');
      setError('');
    } catch (err) {
      setError('Failed to create task');
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <input type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
      <input type="email" value={sharedWith} onChange={(e) => setSharedWith(e.target.value)} placeholder="Share with (email)" required />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
