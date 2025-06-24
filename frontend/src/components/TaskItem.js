import React, { useState } from 'react';

function TaskItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleUpdate = () => {
    fetch(`/api/tasks/${task._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
    .then(res => res.json())
    .then(updatedTask => {
      onUpdate(updatedTask);
      setIsEditing(false);
    });
  };

  const handleDelete = () => {
    fetch(`/api/tasks/${task._id}`, { method: 'DELETE' })
      .then(() => onDelete(task._id));
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <span>{task.title}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default TaskItem;
