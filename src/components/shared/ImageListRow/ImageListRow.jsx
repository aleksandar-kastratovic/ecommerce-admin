import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Stack from "@mui/material/Stack";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { reorder, getItemStyle, getListStyle } from "./util";

// https://github.com/atlassian/react-beautiful-dnd

const ImageListRow = ({
  imageList = [],
  setImageList,
  handleModalOpen = () => {},
  handleDeleteImage = () => {},
}) => {
  const onDragEnd = ({ destination, source }) => {
    // dropped outside the list
    if (!destination) return;
    const newItems = reorder(imageList, source.index, destination.index);
    setImageList(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided, snapshot) => (
          <ImageList
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            {imageList &&
              imageList.map((item, index) => (
                <Draggable key={item.id} draggableId={item.name} index={index}>
                  {(provided, snapshot) => (
                    <div>
                      <ImageListItem
                        key={item.image}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                        // TODO moze i ovako da se podesava stil na drag slika/elemenata
                        // className={snapshot.isDragging ? "class1" : "class2"}
                      >
                        <img
                          key={item.src}
                          src={item?.src}
                          srcSet={item?.src}
                          alt={item?.name}
                          loading="lazy"
                          style={{
                            height: "6rem",
                          }}
                          onClick={(e) =>
                            handleModalOpen(
                              e,
                              item.src,
                              item.alt,
                              item.name,
                              item.size,
                              item.type,
                              item.id
                            )
                          }
                        />
                        <ImageListItemBar
                          sx={{
                            background:
                              "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                              "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                          }}
                          // title={item.name}
                          position="top"
                          actionPosition="right"
                          actionIcon={
                            <IconButton
                              sx={{ color: "white" }}
                              aria-label={`delete ${item.name}`}
                              onClick={(e) => handleDeleteImage(e, item.id)}
                            >
                              <DeleteOutlineIcon />
                            </IconButton>
                          }
                        />
                      </ImageListItem>
                      <Stack spacing={1} sx={{ fontSize: "0.8em" }}>
                        <span>SIze: {item?.size}</span>
                        <span>Type: {item?.type}</span>
                      </Stack>
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </ImageList>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ImageListRow;
