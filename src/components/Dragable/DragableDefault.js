import React from 'react';

const taskData = [
  { id: 'task-1', content: 'Take out the garbage' },
  { id: 'task-2', content: 'Watch my favorite show' },
  { id: 'task-3', content: 'Charge my phone' },
  { id: 'task-4', content: 'Cook dinner' },
];

const DragableDefault = () => {

  return (
    <div className="dragable-default">
      <h2>Dragable Default</h2>

      <div className='dragable-default-wrp' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div className='task-list' style={{ maxWidth: '300px'}}>
          {taskData.map((task) => (
            <div
              key={task.id}
              className='task'
              draggable='true'
              style={{ border: '1px solid lightgrey', padding: '8px', marginBottom: '8px' }}
            >
              {task.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DragableDefault;