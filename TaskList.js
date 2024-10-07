import React from 'react';

const TaskList = ({ tasks, updateTask, deleteTask }) => {
  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>{task.due_date}</p>
          <p>{task.shared_with}</p>
          <p>Status: {task.status}</p>
          <button onClick={() => updateTask(task.id, { ...task, status: 'completed' })}>Mark as Completed</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
