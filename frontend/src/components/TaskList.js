import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const handleUpdate = (updatedTask) => {
    setTasks(tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
  };

  const handleDelete = (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  return (
    <div>
      <h2>Task List</h2>
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
