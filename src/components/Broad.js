import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import { Button, Modal } from "antd";

const generateUUID = () => {
  return "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

let defaultColums = [
  { 
    id: generateUUID(), 
    title: "Column 1",
    tasks: [
      { id: generateUUID(), content: "Task 1", status: "todo" },
      { id: generateUUID(), content: "Task 2", status: "todo" },
      { id: generateUUID(), content: "Task 3", status: "todo" },
    ]
  },
  { 
    id: generateUUID(),
    title: "Column 2",
    tasks: [
      { id: generateUUID(), content: "Task 4", status: "todo" },
      { id: generateUUID(), content: "Task 5", status: "todo" },
      { id: generateUUID(), content: "Task 6", status: "todo" },
    ]
  },
  {
    id: generateUUID(),
    title: "Column 3",
    tasks: [
      { id: generateUUID(), content: "Task 7", status: "todo" },
      { id: generateUUID(), content: "Task 8", status: "todo" },
      { id: generateUUID(), content: "Task 9", status: "todo" },
    ]
  }
]
const STATUS = [
  "todo",
  "inprogress",
  "done"
]

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  return prevProps.line === nextProps.line;
}

const ColumnMemo = React.memo(Column, areEqual);

const Broad = () => {

  const [colums, setColums] = React.useState(defaultColums);
  const [title, setTitle] = React.useState("");
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [isOpened, setIsOpened] = React.useState(false);
  const [content, setContent] = React.useState("");
  const [status, setStatus] = React.useState("todo");

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    if (result.type === "COLUMN") {
      const reorderedColumns = reorder(colums, result.source.index, result.destination.index);
      setColums(reorderedColumns);
      return;
      
    }
    const current = [...colums.find((column) => column.id === result.source.droppableId).tasks];
    const next = [...colums.find((column) => column.id === result.destination.droppableId).tasks];
    const target = current[result.source.index];

    // moving to same list
    if (result.source.droppableId === result.destination.droppableId) {
      const reordered = reorder(current, result.source.index, result.destination.index);
      const tmp = colums.map((column) => {
        console.log("column.id", column.id, result.source.droppableId);
        if (column.id === result.source.droppableId) {
          column.tasks = reordered;
          console.log("column.tasks", column.tasks);
        }
        return column;
      });
      setColums(tmp);
      return;
    }

    // moving to different list
    current.splice(result.source.index, 1);
    next.splice(result.destination.index, 0, target);

    const tmp = colums.map((column) => {
      if (column.id === result.source.droppableId) {
        column.tasks = current;
      } else if (column.id === result.destination.droppableId) {
        column.tasks = next;
      }
      return column;
    });

    setColums(tmp);

  }

  const handleAddColumn = () => {
    if (!title) {
      return;
    }
    const newColumn = {
      id: generateUUID(),
      title: title,
      tasks: []
    };
    setColums([...colums, newColumn]);
    setTitle("");
  }

  const handleAddItem = (columnId, itemTitle) => {
    if (!itemTitle) {
      return;
    }
    const newTask = {
      id: generateUUID(),
      content: itemTitle,
      status: "todo"
    }
    const tmp = colums.map((column) => {
      if (column.id === columnId) {
        column.tasks.push(newTask);
      }
      return column;
    });
    setColums(tmp);
  }

  const handleDeleteColumn = (columnId) => {
    const tmp = colums.filter((column) => column.id !== columnId);
    setColums(tmp);
  }

  const handleDeleteItem = (columnId, itemId) => {
    const tmp = colums.map((column) => {
      if (column.id === columnId) {
        column.tasks = column.tasks.filter((task) => task.id !== itemId);
      }
      return column;
    });
    setColums(tmp);
  }

  const handleEditItem = () => {

    const newItem = {
      id: selectedItem.item.id,
      content: content,
      status: status
    }

    const tmp = colums.map((column) => {
      if (column.id === selectedItem.columnId) {
        column.tasks = column.tasks.map((task) => {
          if (task.id === selectedItem.item.id) {
            return newItem;
          }
          return task;
        });
      }
      return column;
    });

    setColums(tmp);
    setContent("");
    setStatus("todo");
    setIsOpened(false);
  }

  const handleDelete = () => {
    const tmp = colums.map((column) => {
      if (column.id === selectedItem.columnId) {
        column.tasks = column.tasks.filter((task) => task.id !== selectedItem.item.id);
      }
      return column;
    });
    setColums(tmp);
    setContent("");
    setStatus("todo");
    setIsOpened(false);
  }

  const handleCancelEditItem = () => {
    setSelectedItem(null);
    setContent("");
    setStatus("todo");
    setIsOpened(false);
  }

  const handleOpenEditItem = (columnId, item) => {
    setIsOpened(true);
    setContent(item.content);
    setStatus(item.status);
    setSelectedItem({
      columnId: columnId,
      item: item
    });
  }

  return (
    <>
      <div className="broad-wrp">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="dropable-1"
            type="COLUMN"
            direction="horizontal"
            isCombineEnabled={true}
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                className="broad"
              >
                
                {colums.map((column, index) => (
                  <Column
                    key={column.id}
                    data-id={column.id} 
                    index={index}
                    column={column}
                    handleAddItem={handleAddItem}
                    handleDeleteColumn={handleDeleteColumn}
                    handleDeleteItem={handleDeleteItem}
                    handleOpenEditItem={handleOpenEditItem}
                  />
                ))}
                {provided.placeholder}
                <div className="add-column">
                  <div className="add-column-title" onClick={() => { handleAddColumn()}}>
                    + Add Column
                  </div>
                  <div className="add-column-input">
                    <input
                      type="text"
                      placeholder="Column title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { handleAddColumn() }}}
                    />
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Modal
          title="Edit item"
          open={isOpened}
          onOk={handleEditItem}
          onCancel={handleCancelEditItem}

          footer={(_, { OkBtn, CancelBtn }) => (
            <>
              <Button className="btn-delete" onClick={handleDelete}>Delete</Button>
              <OkBtn />
              <CancelBtn />
            </>
          )}
        >
          <div className="edit-item-wrp">

            <div className="edit-input">
              <div>Content:</div>
              <input
                type="text"
                value={content}
                onChange={(e) => { setContent(e.target.value) }}
              />
            </div>
            <div className="edit-input">
              <div>Status:</div>
              <select
                onChange={(e) => { setStatus(e.target.value) }}
                // defaultValue={status}
              >
                {STATUS.map((s) => (
                  <option key={s} value={s} selected={s == status}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Broad;