import React from "react";
import Droppable from "./Dragable/Dropable";
import NItem from "./NItem";

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  return prevProps.taskId === nextProps.taskId && 
         prevProps.taskContent === nextProps.taskContent && 
         prevProps.index === nextProps.index &&
         prevProps.columnId === nextProps.columnId;
}

const NItemMemo = React.memo(NItem, areEqual);

const NItems = ({ columnId, tasks, handleOpenEditItem }) => {

  return (
    <div className="items" key={columnId}>
      <Droppable
        type="TASK"
        dropableId={columnId}
      >
        {tasks.map((task, index) => (
          <NItemMemo
            key={task._id}
            taskId={task._id}
            taskContent={task.content}
            index={index}
            columnId={columnId}
            handleOpenEditItem={handleOpenEditItem}
          />
        )).filter((task) => task !== undefined)}
      </Droppable>
    </div>
  )
}

export default NItems;