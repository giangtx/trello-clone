import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Item from './Item';

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  return prevProps.line === nextProps.line;
}

const ItemMemo = React.memo(Item, areEqual);

const Items = ({ items, listId, handleDeleteItem, handleOpenEditItem }) => {
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
            <ItemMemo 
              key={item.id} 
              item={item} 
              index={index} 
              listId={listId} 
              handleDeleteItem={handleDeleteItem}
              handleOpenEditItem={handleOpenEditItem}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Items;