import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './DailyPlanner.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';


const ItemType = 'ITEM';

const DraggableItem = ({ item, index, moveItem, removeItem }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="draggable-item">
      <div className="handle">&#9776;</div>
      <div>{item.content}</div>
      <button onClick={() => removeItem(index)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

const DailyPlanner = () => {
  const [items, setItems] = useState([
    { id: 1, content: 'Quick meditation' },
    { id: 2, content: 'Make the bed' },
    { id: 3, content: 'Shower' },
  ]);
  const [newItemContent, setNewItemContent] = useState('');

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  const addItem = () => {
    if (newItemContent.trim() !== '') {
      setItems([
        ...items,
        { id: items.length + 1, content: newItemContent },
      ]);
      setNewItemContent('');
    }
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className='page-container'>
      <div className='draggable-container'>
        <DndProvider backend={HTML5Backend}>
          <div >
            <h1>Daily Planner</h1>
            <div className='dragin'>
              
            <input
              
              type='text'
              value={newItemContent}
              onChange={(e) => setNewItemContent(e.target.value)}
              placeholder='Add new item'
            />
            
            <button className='add-item' onClick={addItem}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
            </div>
            {items.map((item, index) => (
              <DraggableItem
                key={item.id}
                item={item}
                index={index}
                moveItem={moveItem}
                removeItem={removeItem}
              />
            ))}
          </div>
        </DndProvider>
      </div>
    </div>
  );
};


export default DailyPlanner;
