import React, { useEffect } from "react";
import Droppable from "./Dragable/Dropable";
import DragDropContextProvider from "./Dragable/DragDropContext";
import NColumn from "./NColumn";
import { useClickOutside } from "../hooks";
import { 
  getBroad,
  updateBroad,
  addColumn,
  addItem,
  updatePosition,
  editItem
} from "../api";
import { useParams } from "react-router-dom";
import ModalEditItem from "./Modal/ModalEditItem";

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  const preTask = JSON.stringify(prevProps.tasks);
  const nextTask = JSON.stringify(nextProps.tasks);
  return preTask === nextTask && prevProps.columnId === nextProps.columnId && nextProps.index === prevProps.index;
}

const NColumnMemo = React.memo(NColumn, areEqual);

const generateUUID = () => {
  return "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const BroadTest = () => {

  const { id } = useParams();

  const ref = useClickOutside(() => {
    setIsAdding(false);
  })

  const [broadTitle, setBroadTitle] = React.useState("");
  const [broadBackground, setBroadBackground] = React.useState("");
  const [colums, setColums] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [isOpened, setIsOpened] = React.useState(false);
  const [isAdding, setIsAdding] = React.useState(false);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  useEffect(() => {
    fetchBroad(id);
  }, []);

  useEffect(() => {
    window.addEventListener('dragend', onDragEnd)

    return () => {
      window.removeEventListener('dragend', onDragEnd)
    }
  }, [colums]);

  const fetchBroad = async (id) => {
    const res = await getBroad(id);
    console.log("res", res);
    setBroadTitle(res.broad.title);
    setBroadBackground(res.broad.background);
    setColums(res.broad.columns.filter((column) => column));
  }

  const onDragEnd = (res) => {
    const result = res.detail;
    if (!result.destination) {
      return;
    }
    updatePosition(id, {
      type: result.type,
      source: result.source,
      destination: result.destination
    })
    if (result.type === "COLUMN") {
      const reorderedColumns = reorder(colums, result.source.index, result.destination.index);
      console.log(colums, result.source.index, result.destination.index);
      if (reorderedColumns.filter((column) => column).length > 0) {
        setColums(reorderedColumns.filter(col => col));
      }
      return;
      
    }
    const current = [...colums.find((column) => column.id === result.source.droppableId)?.tasks || []];
    const next = [...colums.find((column) => column.id === result.destination.droppableId)?.tasks || []];
    const target = current[result.source.index];

    // moving to same list
    if (result.source.droppableId === result.destination.droppableId) {
      const reordered = reorder(current, result.source.index, result.destination.index);
      const tmp = colums.filter(col => col).map((column) => {
        console.log("column.id", column.id, result.source.droppableId);
        if (column.id === result.source.droppableId) {
          column.tasks = reordered.filter((task) => task !== undefined);
        }
        return column;
      });
      setColums(tmp);
      return;
    }

    // moving to different list
    current.splice(result.source.index, 1);
    next.splice(result.destination.index, 0, target);

    const tmp = colums.filter(col => col).map((column) => {
      if (column.id === result.source.droppableId) {
        column.tasks = current.filter((task) => task !== undefined);
      } else if (column.id === result.destination.droppableId) {
        column.tasks = next.filter((task) => task !== undefined);
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
      tasks: [],
    };
    const result = [...colums, newColumn];
    setColums(result);
    setTitle("");
    setIsAdding(false);

    addColumn(id, {
      title: title,
      tasks: [],
      columnId: newColumn.id
    })
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
    const tmp = colums.filter(col => col).map((column) => {
      if (column.id === columnId) {
        column.tasks.push(newTask);
      }
      return column;
    });
    setColums(tmp);

    addItem(columnId, {
      content: itemTitle,
    })
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

  const handleEditItem = async(id, content, status) => {

    const newItem = await editItem(id, { content, status });

    const tmp = colums.map((column) => {
      if (column.id === selectedItem.columnId) {
        column.tasks = column.tasks.map((task) => {
          if (task._id === id) {
            return newItem.item;
          }
          return task;
        });
      }
      return column;
    });

    setColums(tmp);
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
    setIsOpened(false);
  }

  const handleCancelEditItem = () => {
    setSelectedItem(null);
    setIsOpened(false);
  }

  const handleOpenEditItem = (columnId, item) => {
    setIsOpened(true);
    setSelectedItem({
      columnId: columnId,
      item: item
    });
  }

  return (
    <div 
      className="page broad-page"
      style={{background: broadBackground}}
    >
      <div className="broad-top">
        {broadTitle}
      </div>
      <div className="p-[10px] h-full">
        <div className="broad-wrp">
          {/* <DragDropContextProvider
            // onDragEnd={onDragEndCallback}
          > */}
            <Droppable
              type="COLUMN"
              dropableId="dropable-1"
              direction="horizontal"
              customClass="broad"
            >
              {colums.map((column, index) => (
                <NColumn
                  key={column.id}
                  columnId={column.id}
                  columnTitle={column.title}
                  tasks={column.tasks}
                  index={index}
                  handleAddItem={handleAddItem}
                  handleDeleteColumn={handleDeleteColumn}
                  handleDeleteItem={handleDeleteItem}
                  handleOpenEditItem={handleOpenEditItem}
                />
              ))}
              <div className="add-column">
                {!isAdding && (
                  <div className="add-column-title" onClick={() => { setIsAdding(true) }}>
                    + Add another list
                  </div>
                )}
                {isAdding && (
                  <div ref={ref} className="add-column-wrp">
                    <div className="add-item-input">
                      <input
                        type="text"
                        placeholder="Enter list title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { handleAddColumn() }}}
                      />
                    </div>
                    <div className="add-item-actions">
                      <div className="add-item-btn" onClick={() => { handleAddColumn() }}>
                        Add list
                      </div>
                      <div className="add-item-btn-cancel" onClick={() => { setIsAdding(false) }}>
                        <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z" fill="currentColor"></path></svg>
                      </div>
                    </div>
                  </div>
                  
                )}
                
              </div>
            </Droppable>
          {/* </DragDropContextProvider> */}
        </div>
        {/* <DragableDefault /> */}
        <ModalEditItem
          isOpened={isOpened}
          handleEditItem={handleEditItem}
          handleDelete={handleDelete}
          handleCancelEditItem={handleCancelEditItem}
          item={selectedItem?.item}
        />
      </div>
    </div>
    
  );
}

export default BroadTest;