import React from "react";
import Draggable from "./Dragable";
import Droppable from "./Dropable";
import DragDropContextProvider from "./DragDropContext";

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
const BroadTest = () => {
  const [colums, setColums] = React.useState(defaultColums);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    console.log(colums)
    console.log(result);
    if (!result.destination) {
      return;
    }
    if (result.type === "COLUMN") {
      const reorderedColumns = reorder(colums, result.source.index, result.destination.index);
      setColums(reorderedColumns);
      return;
      
    }
    const current = [...colums.find((column) => column.id === result.source.droppableId)?.tasks || []];
    const next = [...colums.find((column) => column.id === result.destination.droppableId)?.tasks || []];
    const target = current[result.source.index];

    console.log("current", current);
    console.log("next", next);

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
    console.log(result.source.index, result.destination.index);

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


  return (
    <div>
      <h1>BroadTest</h1>
      <DragDropContextProvider
        onDragEnd={onDragEnd}
      >
        <Droppable
          type="COLUMN"
          dropableId="dropable-1"
          direction="horizontal"
          customClass="broad"
        >
          {colums.map((column, index) => (
            <Draggable
              key={column.id}
              draggableId={column.id}
              index={index}
              type="COLUMN"
              dropableId="dropable-1"
            >
              <div className="column">
                <div style={{ padding: '8px', border: '1px solid lightgrey' }}>
                  {column.title}
                  <div className="items">
                    <Droppable
                      type="TASK"
                      dropableId={column.id}
                    >
                      {column.tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task?.id}
                          index={index}
                          type="TASK"
                          dropableId={column?.id}
                        >
                          <div className="item">
                            <div className="item-content">
                              {task.content}
                            </div>
                          </div>
                        </Draggable>
                      )).filter((task) => task)}
                    </Droppable>
                  </div>
                </div>
              </div>
            </Draggable>
          ))}
        </Droppable>
      </DragDropContextProvider>
    </div>
  );
}

export default BroadTest;