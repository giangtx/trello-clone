import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Items = ({ items, listId }) => {
  return (
    <Droppable 
        droppableId={listId}
        type="ITEM"
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="items"
        >
          {items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="item"
                >
                  <div
                    isDragging={snapshot.isDragging}
                  >
                    <div
                      className="item-content"
                      isDragging={snapshot.isDragging}
                      {...provided.dragHandleProps}
                      aria-label={item.content}
                    >{item.content}</div>
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Items;