import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Items from "./Items";
import { useClickOutside } from "../hooks";

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  return prevProps.line === nextProps.line;
}

const ItemsMemo = React.memo(Items, areEqual);

const Column = ({ column, index, handleAddItem, handleDeleteColumn, handleDeleteItem, handleOpenEditItem }) => {

  const ref = useClickOutside(() => {
    setIsAdding(false);
  });

  const [isAdding, setIsAdding] = React.useState(false);

  const [title, setTitle] = React.useState("");

  const handleAddItemChild = () => {
    if (title) {
      handleAddItem(column.id, title);
      setTitle("");
      setIsAdding(false);
    }
  }
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
            >
              {column.title}
              <div className="icon" onClick={() => {handleDeleteColumn(column.id)}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></div>
            </div>
          </div>
          <div className="add-item">
            {!isAdding && (
              <div className="add-item-title" onClick={() => {setIsAdding(true)}}>
                + Add Item
              </div>
            )}
            {isAdding && (
              <div ref={ref}>
                <div className="add-item-input">
                  <input
                    type="text"
                    placeholder="item title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { handleAddItemChild() }}}
                  />
                </div>
                <div className="add-item-actions">
                  <div className="add-item-btn" onClick={() => { handleAddItem() }}>
                    Add
                  </div>
                  <div className="add-item-btn" onClick={() => { setIsAdding(false) }}>
                    Cancel
                  </div>
                </div>
              </div>
            )}
          </div>
          <ItemsMemo
            listId={column.id}
            items={column.tasks}
            handleDeleteItem={handleDeleteItem}
            handleOpenEditItem={handleOpenEditItem}
          />
        </div>
      )}
    </Draggable>
  );
}

export default Column;