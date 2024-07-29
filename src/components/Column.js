import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Items from "./Items";

const Column = ({ column, index }) => {
  return (
    <Draggable draggableId={column.id} index={index} key={column.id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="column"
        >
          <div
            isDragging={snapshot.isDragging}
          >
            <div
              className="column-title"
              isDragging={snapshot.isDragging}
              {...provided.dragHandleProps}
              aria-label={column.title}
            >{column.title}</div>
          </div>
          <Items
            listId={column.id}
            items={column.tasks} 
          />
        </div>
      )}
    </Draggable>
  );
}

export default Column;