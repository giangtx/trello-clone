import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { editItem } from "../../api";

const STATUS = [
    "todo",
    "inprogress",
    "done"
  ]

const ModalEditItem = ({ isOpened, item, handleCancelEditItem, handleDelete, handleEditItem }) => {

    const [content, setContent] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (item) {
            setContent(item.content);
            setStatus(item.status);
        }
    }, [item])

    return (
        <Modal
          title="Edit item"
          open={isOpened}
          onOk={() => { handleEditItem(item._id, content, status) }}
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
    )
}

export default ModalEditItem;