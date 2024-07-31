import React from 'react';

const Droppable = ({ dropableId, type, children, customClass, direction }) => {
  return (
    <div
      className={`droppable ${customClass || ''}`}
      data-type={type}
      data-droppable-id={dropableId}
      data-direction={direction || 'vertical'}
    >
      {children}
    </div>
  )
};

export default Droppable;