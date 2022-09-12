import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Stack from "@mui/material/Stack";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { reorder, getItemStyle, getListStyle } from "./util";
import { Icon } from "@mui/material";
import IconList from "../../../../helpers/icons";

// https://github.com/atlassian/react-beautiful-dnd

const ImageListRow = ({ imageList = [], setImageList, handleModalOpen = () => {}, handleDeleteImage = () => {}, handleReorder = () => {} }) => {
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
                                        <div>
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
                                                            height: "6rem",
                                                        }}
                                                        onClick={(e) => handleModalOpen(e, item.src, item.alt, item.name, item.size, item.type, item.id, item.position)}
                                                    />
                                                ) : (
                                                    <div
                                                        key={item.src}
                                                        style={{
                                                            height: "6rem",
                                                            background: "white",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                        onClick={(e) => handleModalOpen(e, item)}
                                                    >
                                                        {item.thumb_image ? <img src={item.thumb_image} width="100%" height="100%" /> : <Icon fontSize="large">{IconList.editDocument}</Icon>}
                                                    </div>
                                                )}
                                                <ImageListItemBar
                                                    sx={{
                                                        background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " + "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                                                    }}
                                                    // TODO DEMO za prikaz imena slike
                                                    // title={item.name}
                                                    position="top"
                                                    actionPosition="right"
                                                    actionIcon={
                                                        <IconButton sx={{ color: "white" }} aria-label={`delete ${item.name}`} onClick={(e) => handleDeleteImage(e, item.id, item.new)}>
                                                            <DeleteOutlineIcon />
                                                        </IconButton>
                                                    }
                                                />
                                            </ImageListItem>
                                            <Stack spacing={1} sx={{ fontSize: "0.8em", width: "8rem" }}>
                                                <span style={{ lineHeight: "1.4em", maxHeight: "2.8em", wordBreak: "break-all", overflow: "hidden" }}>Name: {item?.name}</span>
                                                <span>Size: {Math.round((item?.size / 1024 / 1024) * 1000) / 1000} MB</span>
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
        </>
    );
};

export default ImageListRow;
