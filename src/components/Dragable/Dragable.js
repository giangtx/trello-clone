import React from 'react';
import { DragDropContext } from './DragDropContext';

const Draggable = ({ children, draggableId, index, type, dropableId }) => {
  const ref = React.useRef(null);

  const { onDragEnd } = React.useContext(DragDropContext);
  const [isDragging, setIsDragging] = React.useState(false);
  const [target, setTarget] = React.useState(null);

  const handleDragStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);

    let dropable = ref.current.closest('.droppable');
    if (!dropable) return;
    let siblings = Array.from(dropable.childNodes);
    let oldOldIndex = ref.current.getAttribute('data-index');
    let oldIndex = parseInt(oldOldIndex);

    let dragItemWrp = ref.current;
    let destinationDropableId = dropableId;
   

    let holder = ref.current.querySelector('.drag-item');
    const direction = dropable.getAttribute('data-direction');
    const oldWidth = dragItemWrp.offsetWidth;
    const oldHeight = dragItemWrp.offsetHeight; 

    dragItemWrp.style.height = oldHeight + 'px';
    dragItemWrp.style.width = oldWidth+ 'px';

    holder.style.width = dragItemWrp.offsetWidth + 'px';
    holder.style.height = holder.offsetHeight + 'px';
    holder.style.left = e.clientX - holder.offsetWidth / 2 + 'px';
    holder.style.top = e.clientY - holder.offsetHeight / 2 + 'px';

    ref.current.classList.add('dragging-wrp');
    holder.classList.add('dragging');
    dropable.classList.add('drop-dragging');

    let fakeItemWrp = dragItemWrp.cloneNode(true);
    fakeItemWrp.classList.add('fake-item-wrp');

    let target = null;
    siblings.forEach((sibling) => {
      sibling.classList.add('dragging-over');
      sibling.setAttribute('old-index', sibling.getAttribute('data-index'));
    });

    document.onmousemove = (e) => {
      e.preventDefault();
      holder.style.pointerEvents = 'none';
      target = document.elementFromPoint(e.clientX, e.clientY);
      if (!target) {
        console.log('no target')
        holder.style.pointerEvents = '';
        return
      };
      let targetCheck = target.closest('.draggable');
      if (targetCheck) {
        target = targetCheck;
      }
  
      let targetDropable = target.closest('.droppable');
      if (targetDropable && targetDropable.getAttribute('data-type') == type) {
        if (targetDropable && targetDropable.getAttribute('data-droppable-id') != dropableId) {
          const checkFakeItem = targetDropable.querySelector('.fake-item-wrp');
          if (!checkFakeItem) {
            fakeItemWrp.innerHTML = '';
            fakeItemWrp.style.height = dragItemWrp.offsetHeight + 'px';
            fakeItemWrp.style.width = dragItemWrp.offsetWidth + 'px';
            fakeItemWrp.setAttribute('data-index', targetDropable.childNodes.length);
            dragItemWrp.setAttribute('data-index', targetDropable.childNodes.length);
            targetDropable.appendChild(fakeItemWrp);
          }
          
          dragItemWrp.style.height = '';
          dragItemWrp.style.width = '';
          oldIndex = targetDropable.childNodes.length;

          let otherDropable = document.querySelectorAll('.droppable');
          otherDropable.forEach((dr) => {
            if (dr.getAttribute('data-droppable-id') == dropableId) {
              let otherSiblings = Array.from(dr.childNodes);
              otherSiblings.forEach((sibling) => {
                sibling.style.transform = '';
              })
            }
          });
          
          siblings = Array.from(targetDropable.childNodes);
          destinationDropableId = targetDropable.getAttribute('data-droppable-id');
          siblings.forEach((sibling) => {
            sibling.classList.add('dragging-over');
          });
        } else {
          siblings = Array.from(dropable.childNodes);
          dragItemWrp.style.height = oldHeight + 'px';
          dragItemWrp.style.width = oldWidth + 'px';
          oldIndex = parseInt(oldOldIndex);
          document.querySelectorAll('.fake-item-wrp').forEach((item) => {
            item.remove();
          });
          let otherDropable = document.querySelectorAll('.droppable');
          otherDropable.forEach((dr) => {
            if (dr.getAttribute('data-droppable-id') != dropableId) {
              let otherSiblings = Array.from(dr.childNodes);
              otherSiblings.forEach((sibling) => {
                sibling.style.transform = '';
                sibling.classList.remove('dragging-over');
              });
            }
          });
          destinationDropableId = dropableId;
        }
      }
     
      holder.style.pointerEvents = '';

      holder.style.left =  e.clientX - holder.offsetWidth / 2 + 'px';
      holder.style.top = e.clientY - holder.offsetHeight / 2 + 'px';
      if (direction == 'vertical') {
        handleVertical();
      } else {
        handleHorizontal();
      }
      function positionItems(insertIndex) {
        let indexCounter = 0;
        siblings.forEach((item, i) => {
          if (!item.classList.contains('dragging-wrp')) {
            // console.log(item)
            if (indexCounter == insertIndex) {
              indexCounter++;
            }
            if (oldIndex <= insertIndex) {
              if (i <= insertIndex && i >= oldIndex) {
                item.style.transform = `translateY(${-holder.offsetHeight}px)`;
              } else {
                item.style.transform = `translateY(0)`;
              }
            } else {
              if (i >= insertIndex && i < oldIndex) {
                item.style.transform = `translateY(${holder.offsetHeight}px)`;
              } else {
                item.style.transform = `translateY(0)`;
              }
            }
            
            if (indexCounter < siblings.length) {
              // console.log('indexCounter', indexCounter, siblings.length)
              item.setAttribute('data-index', indexCounter);
            }
            indexCounter++;
          }
        })
      }

      function positionItemsHorizontal(insertIndex) {
        let indexCounter = 0;
        siblings.forEach((item, i) => {
          if (!item.classList.contains('dragging-wrp')) {
            // console.log(item)
            if (indexCounter == insertIndex) {
              indexCounter++;
            }
            if (oldIndex <= insertIndex) {
              if (i <= insertIndex && i >= oldIndex) {
                item.style.transform = `translateX(${-holder.offsetWidth}px)`;
              } else {
                item.style.transform = `translateX(0)`;
              }
            } else {
              if (i >= insertIndex && i < oldIndex) {
                item.style.transform = `translateX(${holder.offsetWidth}px)`;
              } else {
                item.style.transform = `translateX(0)`;
              }
            }

            if (indexCounter < siblings.length) {
              // console.log('indexCounter', indexCounter, siblings.length)
              item.setAttribute('data-index', indexCounter);
            }
            indexCounter++;
          }
        })
      }

      function handleVertical() {
        let posY = e.clientY - (dropable.offsetTop - window.scrollY);
        let holderIndex = parseInt(dragItemWrp.getAttribute('data-index'));

        if (holderIndex != 0) {
          let beforeItem = siblings[holderIndex - 1];
          let beforeMiddle = posY < (beforeItem.offsetTop - dropable.offsetTop) + (beforeItem.offsetHeight / 2);
          if (beforeMiddle) {
            positionItems(holderIndex - 1);
            dragItemWrp.setAttribute('data-index', holderIndex - 1);
            if (fakeItemWrp) {
              fakeItemWrp.setAttribute('data-index', holderIndex - 1);
            }
          }
        }
        if (holderIndex != siblings.length) {
          let afterItem = siblings[holderIndex + 1] ? siblings[holderIndex + 1] : siblings[holderIndex];
          let afterMiddle = posY > ((afterItem.offsetTop) - dropable.offsetTop) + (afterItem.offsetHeight / 2);
          if (afterMiddle) {
            if (holderIndex + 1 < siblings.length) {
              positionItems(holderIndex + 1);
              dragItemWrp.setAttribute('data-index', holderIndex + 1);
              if (fakeItemWrp) {
                fakeItemWrp.setAttribute('data-index', holderIndex + 1);
              }
            }
          }
        }
      }
      function handleHorizontal () {
        let posX = e.clientX - (dropable.offsetLeft - window.scrollX);
        let holderIndex = parseInt(dragItemWrp.getAttribute('data-index'));

        if (holderIndex != 0) {
          let beforeItem = siblings[holderIndex - 1];
          let beforeMiddle = posX < (beforeItem.offsetLeft - dropable.offsetLeft) + (beforeItem.offsetWidth / 2);
          if (beforeMiddle) {
            positionItemsHorizontal(holderIndex - 1);
            dragItemWrp.setAttribute('data-index', holderIndex - 1);
          }
        }
        if (holderIndex != siblings.length) {
          let afterItem = siblings[holderIndex + 1] ? siblings[holderIndex + 1] : siblings[holderIndex];
          let afterMiddle = posX > ((afterItem.offsetLeft) - dropable.offsetLeft) + (afterItem.offsetWidth / 2);
          if (afterMiddle) {
            if (holderIndex + 1 < siblings.length) {
              positionItemsHorizontal(holderIndex + 1);
              dragItemWrp.setAttribute('data-index', holderIndex + 1);
            }
          }
        }
      }
    }

    document.onmouseup = (e) => {
      holder.style.position = '';
      holder.style.zIndex = '';
      holder.style.width = '';
      holder.style.height = '';
      holder.style.left = '';
      holder.style.top = '';
      holder.classList.remove('dragging');

      dragItemWrp.classList.remove('dragging-wrp');
      dragItemWrp.style.height = '';

      siblings.forEach((sibling) => {
        sibling.style.transform = '';
        sibling.classList.remove('dragging-over');
        sibling.removeAttribute('old-index');
      });
      document.querySelectorAll('.fake-item-wrp').forEach((item) => {
        item.remove();
      });

      const result = {
        type: type,
        source: {
          droppableId: dropableId,
          index: parseInt(oldOldIndex)
        },
        destination: {
          droppableId: destinationDropableId,
          index: parseInt(dragItemWrp.getAttribute('data-index'))
        }
      }

      onDragEnd(result);
      setIsDragging(false);
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }

  return (
    <div
      ref={ref}
      data-draggable-id={draggableId}
      data-index={index}
      className='draggable'
    >
      <div
        className='drag-item'
        data-draggable-id={draggableId}
        data-index={index}
        onMouseDown={handleDragStart}
      >
        {children}
      </div>
      
    </div>
  )
};

export default Draggable;