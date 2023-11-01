import React, { useState } from "react";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Stack from "@mui/material/Stack";
import Icon from "@mui/material/Icon";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { reorder, getItemStyle, getListStyle } from "./util";
import IconList from "../../../../helpers/icons";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

// https://github.com/atlassian/react-beautiful-dnd

const ImageListRow = ({ imageList = [], setImageList, handleModalOpen = () => { }, handleDeleteImage = () => { }, handleReorder = () => { } }) => {
  const [bttnText, setBttnText] = useState("Kopirajte link");
  const onDragEnd = ({ destination, source }) => {
    // dropped outside the list
    if (!destination) return;
    const newItems = reorder(imageList, source.index, destination.index);
    setImageList(newItems);
    handleReorder(imageList[source.index].id, destination.index + 1);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <ImageList ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>
              {imageList.map((item, index) => (
                <Draggable key={item.id} draggableId={item.name ?? item.id + "drag"} index={index}>
                  {(provided, snapshot) => (
                    <Box sx={{ position: "relative" }}>
                      <ImageListItem
                        key={item.image}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      // TODO moze i ovako da se podesava stil na drag slika/elemenata
                      // className={snapshot.isDragging ? "class1" : "class2"}
                      >
                        {item.src.includes("image") ? (
                          <img
                            key={item.src}
                            src={item?.src}
                            srcSet={item?.src}
                            alt={item?.name}
                            loading="lazy"
                            style={{
                              height: "10rem",

                            }}
                            onClick={(e) => handleModalOpen(e, item.src, item.alt, item.name, item.size, item.type, item.id, item.position, item.path)}
                          />
                        ) : (
                          <Box
                            key={item.src}
                            style={{
                              height: "10rem",
                              background: "white",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            onClick={(e) => handleModalOpen(e, item)}
                          >
                            {item.thumb_image ? <img src={item.thumb_image} width="100%" height="100%" /> : <Icon fontSize="large">{IconList.editDocument}</Icon>}
                          </Box>
                        )}
                      </ImageListItem>
                      <Stack sx={{ background: "rgba(0, 0 , 0,0.4)", borderRadius: "0 0 0.25rem 0.25rem", display: "grid", gridTemplateRows: "auto auto", gridTemplateColumns: "1fr auto", gap: "0.2rem", alignItems: "center", position: "absolute", bottom: 0, width: "100%" }}>
                        <Typography variant="subtitle2" noWrap style={{ cursor: "pointer", color: "#ffff", fontSize: "0.75rem", gridRow: "1", gridColumn: "1", padding: "0.3rem 0 0 0.3rem" }} onClick={(e) => handleModalOpen(e, item.src, item.alt, item.name, item.size, item.type, item.id, item.position)}>
                          Naziv: {item?.name}
                        </Typography>

                        <Typography variant="subtitle2" noWrap style={{ cursor: "pointer", color: "#ffff", fontSize: "0.625rem", gridRow: "2", gridColumn: "1 / span 2", padding: "0 0 0.3rem 0.3rem" }} onClick={(e) => handleModalOpen(e, item.src, item.alt, item.name, item.size, item.type, item.id, item.position)}>
                          Veličina: {Math.round((item?.size / 1024 / 1024) * 1000) / 1000} MB
                        </Typography>

                        <IconButton sx={{ color: "#ffff", gridArea: "1 / 2 / auto / span 1" }} aria-label={`delete ${item.name}`} onClick={(e) => handleDeleteImage(e, item.id, item.new)}>
                          <DeleteOutlineIcon />
                        </IconButton>
                        <IconButton
                          sx={{ color: "#ffff", gridArea: "2 / 2 / auto / span 1" }}
                          onClick={() => {
                            navigator.clipboard.writeText(item?.path)
                              .then(() => {
                                setBttnText("Link je kopiran");
                                setTimeout(() => {
                                  setBttnText("Kopirajte link");
                                }, 3000);
                              })
                              .catch((error) => {
                                console.error("Greška pri kopiranju u međuspremnik:", error);
                              });
                          }}>
                          <Tooltip title={bttnText} placement="bottom" arrow>
                            <ContentCopyIcon sx={{ fontSize: "1.3rem" }} />
                          </Tooltip>
                        </IconButton>
                      </Stack>
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ImageList>
          )}
        </Droppable>
      </DragDropContext >
    </>
  );
};

export default ImageListRow;
