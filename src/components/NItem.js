import Draggable from "./Dragable/Dragable";

const NItem = ({ 
  taskId,
  taskContent,
  columnId,
  index,
  handleOpenEditItem,
  status,
}) => {

  const handleEditItem = () => {
    console.log(taskId)
    handleOpenEditItem(columnId, {
      _id: taskId,
      content: taskContent,
      status: "todo"
    });
  }

  return (
    <Draggable
      key={taskId}
      draggableId={taskId}
      index={index}
      type="TASK"
      dropableId={columnId}
    >
      <div className="item">
        <div className="item-content">
          {taskContent}

          <div className="edit-item" onClick={handleEditItem}>
            <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M7.82034 14.4893L9.94134 16.6103L18.4303 8.12131L16.3093 6.00031H16.3073L7.82034 14.4893ZM17.7233 4.58531L19.8443 6.70731C20.6253 7.48831 20.6253 8.7543 19.8443 9.53531L10.0873 19.2933L5.13734 14.3433L14.8943 4.58531C15.2853 4.19531 15.7973 4.00031 16.3093 4.00031C16.8203 4.00031 17.3323 4.19531 17.7233 4.58531ZM5.20094 20.4097C4.49794 20.5537 3.87694 19.9327 4.02094 19.2297L4.80094 15.4207L9.00994 19.6297L5.20094 20.4097Z" fill="currentColor"></path></svg>
          </div>
        </div>
      </div>
    </Draggable>
  )
};

export default NItem;