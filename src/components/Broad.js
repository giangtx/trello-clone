import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "./Column";

let defaultColums = [
  { 
    id: "column-1", 
    title: "Column 1",
    tasks: [
      { id: "task-1", content: "Task 1" },
      { id: "task-2", content: "Task 2" },
      { id: "task-3", content: "Task 3" },
    ]
  },
  { 
    id: "column-2",
    title: "Column 2",
    tasks: [
      { id: "task-4", content: "Task 4" },
      { id: "task-5", content: "Task 5" },
      { id: "task-6", content: "Task 6" },
    ]
  },
  {
    id: "column-3",
    title: "Column 3",
    tasks: [
      { id: "task-7", content: "Task 7" },
      { id: "task-8", content: "Task 8" },
      { id: "task-9", content: "Task 9" },
    ]
  }
]

const Broad = () => {

  const [colums, setColums] = React.useState(defaultColums);

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
  return (
    <>
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
                  column={column}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default Broad;