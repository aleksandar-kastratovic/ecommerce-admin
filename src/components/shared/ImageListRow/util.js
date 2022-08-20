export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: "0.2rem",
  margin: `0 0.1rem 0 0`,
  width: "8rem",
  height: "auto",
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",
  // styles we need to apply on draggables
  ...draggableStyle,
});

export const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  width: "80%",
  display: "flex",
  padding: 6,
  marginLeft: "0.5rem",
  overflow: "auto",
});
