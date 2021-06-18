import React from 'react';
import '../CssStyles/styles.css';

const ItemsContainer = () => {
  const items = [
    { number: '1', title: '🇮🇳 India' },
    { number: '2', title: '📅 Disciplined' },
    { number: '3', title: '👩🏼‍💻 Web Developent' },
    { number: '4', title: '😎 CS:GO and Code' },
    { number: '5', title: '🥁 Drums and Tabla' },
  ];

  const initialState = {
    draggedTo: null,
    draggedFrom: null,
    originalList: [],
    isDragging: false,
  };

  const [list, setList] = React.useState(items);
  const [dragged, setDraggedItem] = React.useState(initialState);

  const startDrag = (event) => {
    console.log(event.target.dataset.position);
    let position = Number(event.currentTarget.dataset.position);
    setDraggedItem({
      ...dragged,
      draggedFrom: position,
      originalList: list,
      isDragging: true,
    });
    event.dataTransfer.setData('text/html', '');
  };

  const onDragOver = (event) => {
    event.preventDefault();
    let position = Number(event.currentTarget.dataset.position);
    setDraggedItem({
      ...dragged,
      draggedTo: position,
    });
  };

  const onDrop = () => {
    let initialPos = dragged.draggedFrom;
    let finalPos = dragged.draggedTo;
    let newList = [...dragged.originalList];
    [newList[initialPos], newList[finalPos]] = [
      newList[finalPos],
      newList[initialPos],
    ];
    if (initialPos !== finalPos) {
      console.log(initialPos, finalPos);
      setList(newList);
    }
    setDraggedItem({
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  };

  const onDragLeave = () => {
    setDraggedItem({
      ...dragged,
      draggedTo: null,
    });
  };

  // const onDragEnd = () => {
  //   setDraggedItem({
  //     ...dragged,
  //     isDragging: false,
  //   });
  // };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <h3 className="heading">Sample Drag and Drop ✨</h3>
      {list.map((item, index) => (
        <div
          key={index}
          draggable={true}
          onDragStart={startDrag}
          data-position={index}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onDragLeave={onDragLeave}
          // onDragEnd={onDragEnd}
          className={
            dragged.isDragging && dragged.draggedTo === index ? 'drag' : 'box'
          }
        >
          <p className="number">{item && item.number}</p>
          <p className="text">{item && item.title}</p>
        </div>
      ))}
      <p className="author">
        Copyright: <em>@Shubham Pandey</em>
      </p>
    </div>
  );
};

export default ItemsContainer;
