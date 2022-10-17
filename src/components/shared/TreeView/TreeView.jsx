import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import ListTableToolbar from "../ListTable/ListTableToolbar";
import DeleteDialog from "../Dialogs/DeleteDialog";
import PageWrapper from "../Layout/PageWrapper/PageWrapper";
import Button from "../Button/Button";
import TextBoxSingle from "../TextBoxSingle/TextBoxSingle";

import Icon from "@mui/material/Icon";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import { useQuery } from "react-query";
import useAPI from "../../../api/api";

import SortableTree, { addNodeUnderParent, toggleExpandedForAll, changeNodeAtPath } from "react-sortable-tree";
import "react-sortable-tree/style.css";

import scss from "./TreeView.module.scss";

const TreeView = ({ apiUrl, deleteUrl, title, showDatePicker, modifyItems, additionalButtons = [], showNewButton = true, filters = {} }) => {
    const [treeData, setTreeData] = useState([]);
    const api = useAPI();
    const navigate = useNavigate();
    const { gid } = useParams();
    const [search, setSearch] = useState("");
    const [refetch, setRefetch] = useState(false);

    const [searchString, setSearchString] = useState("");
    const [openTextBox, setOpenTextBox] = useState({ open: false, id: null });
    const [searchFocusIndex, setSearchFocusIndex] = useState(0);

    const init = {
        id: null,
        id_category_product_groups: gid,
        name: "",
        parent_id: null,
        order: 1,
    };

    // Default delete URL is the same as the main URL
    deleteUrl = deleteUrl ?? apiUrl;

    // Handle delete dialog
    const [openDeleteDialog, setOpenDeleteDialog] = useState({ show: false, id: null, mutate: null });
    const [addParent, setAddParent] = useState(init);
    const [addChild, setAddChild] = useState(init);
    const handleDeleteConfirm = async () => {
        api.delete(deleteUrl + openDeleteDialog.id)
            .then(() => toast.success("Zapis je uspešno obrisan"))
            .catch(() => toast.warning("Došlo je do greške prilikom brisanja"));

        setOpenDeleteDialog({ show: false, id: null, mutate: 1 });
    };

    // Load the data
    const { data: response, isLoading, isError } = useQuery(["openDeleteDialog.mutate", openDeleteDialog.mutate, refetch, search], () => api.get(apiUrl + gid, { search, ...filters }));

    // Modify the data
    if (response?.payload && modifyItems) {
        response.payload.items = modifyItems(response.payload.items);
    }

    useEffect(() => {
        if (openDeleteDialog.mutate === 1) {
            setOpenDeleteDialog({ show: false, id: null, mutate: 0 });
        }
    }, [openDeleteDialog.mutate]);

    useEffect(() => {
        if (isError) {
            toast.warning("Greška");
        }
    }, [isError]);

    useEffect(() => {
        if (response?.payload) {
            setTreeData(response?.payload);
        }
    }, [isLoading]);

    const handleSearch = (value) => {
        setSearchString(value);
    };

    const handleDelete = (id) => {
        setOpenDeleteDialog({ show: true, id: id, mutate: null });
    };

    const handleEdit = (id) => {
        // TODO make a dynamic path
        navigate(`/categories/category/${gid}/${id}`);
    };

    // Buttons in the page header
    const actions = [...additionalButtons] ?? [];
    if (showNewButton) {
        actions.push({
            label: "Novi unos",
            action: () => navigate("new"),
            variant: "contained",
            icon: "add",
        });
    }

    const renderTreeSkeletons = () => {
        let skeletons = [];
        for (let i = 0; i < 5; i++) {
            skeletons.push(
                <Stack spacing={1} key={i}>
                    <Skeleton variant="text" height={50} width={500} key={i + "main"} />
                    <Skeleton variant="text" height={30} width={250} key={i + 1} />
                    <Skeleton variant="text" height={30} width={250} key={i + 2} />
                </Stack>
            );
        }
        return skeletons;
    };

    const backToCategories = () => {
        navigate(-1);
    };

    const handleChangeTreeData = (treeData) => {
        setTreeData(treeData);
    };

    const handleParent = (e) => {
        setAddParent({ ...addParent, name: e.target.value });
    };

    const handleChild = (e, id) => {
        setAddChild({ ...addChild, parent_id: id, name: e.target.value });
    };

    const cancelParent = () => {
        setAddParent(init);
    };

    const cancelChild = () => {
        setOpenTextBox({ open: false, id: null });
        setAddChild(init);
    };

    const handleOpenTextBox = (id) => {
        setOpenTextBox({ open: true, id: id });
    };

    const saveChild = (path) => {
        if (addChild.name === "") {
            return;
        }
        // in case that you only update UI use this method
        // let newTree = addNodeUnderParent({
        //     treeData: treeData,
        //     parentKey: path.length,
        //     expandParent: true,
        //     getNodeKey,
        //     newNode: {
        //         id: Math.floor(Math.random() * 100) + 1,
        //         title: addChild.name,
        //     },
        // });

        saveData(addChild, "post");
    };

    const saveParent = () => {
        if (addParent.name === "") {
            return;
        }
        // in case that you only update UI
        // let newTree = addNodeUnderParent({
        //     treeData: treeData,
        //     parentKey: null,
        //     expandParent: true,
        //     getNodeKey,
        //     newNode: {
        //         id: Math.floor(Math.random() * 100) + 1,
        //         title: addParent.name,
        //     },
        // });

        saveData(addParent, "post");
    };

    const saveData = async (data, method) => {
        api[method](`admin/category-product/tree`, data)
            .then((response) => {
                cancelChild();
                setAddParent(init);
                toast.success(`Uspešno ${method === "put" ? "izmenjeni" : "dodati"} podaci`);
            })
            .catch((error) => {
                console.warn(error);
                toast.warning("Greška");
            })
            .finally(setRefetch(true));
    };

    const getNodeKey = ({ treeIndex }) => treeIndex;

    // Expand/collapse
    const expand = (expanded) => {
        setTreeData(
            toggleExpandedForAll({
                treeData,
                expanded,
            })
        );
    };

    const expandAll = () => {
        expand(true);
    };

    const collapseAll = () => {
        expand(false);
    };

    const handleDragNode = (node, nextParentNode, nextTreeIndex) => {
        // check documentation for aditional info
        // treeData, node, nextParentNode, prevPath, prevTreeIndex, nextPath, nextTreeIndex
        let updateNode = {
            id: node.id,
            id_category_product_groups: gid,
            name: node.name,
            parent_id: nextParentNode?.id ? nextParentNode?.id : null,
            order: nextTreeIndex,
        };
        saveData(updateNode, "put");
    };

    return (
        <>
            <PageWrapper title={title} actions={actions}>
                <ListTableToolbar onSearch={handleSearch} showDatePicker={showDatePicker} />
                <Button sx={{ mt: "1rem" }} icon={"arrow_back"} label="Nazad" onClick={backToCategories} />

                {!isLoading ? (
                    <>
                        <br />
                        <span className={scss.button} onClick={expandAll}>
                            <Icon className={scss.button}>
                                <span className="material-symbols-outlined">keyboard_double_arrow_down</span>
                            </Icon>
                        </span>
                        Proširi sve
                        <span className={scss.button} onClick={collapseAll}>
                            <Icon className={scss.button}>
                                <span className="material-symbols-outlined">
                                    <span className="material-symbols-outlined">keyboard_double_arrow_up</span>
                                </span>
                            </Icon>
                        </span>
                        Skupi sve
                        <br />
                        <TextBoxSingle
                            name="parent"
                            label="Dodaj novog roditelja"
                            value={addParent.name}
                            onSaveClick={saveParent}
                            onCancelClick={cancelParent}
                            onChange={handleParent}
                            saveIcon="check_circle"
                            cancelIcon="cancel"
                            width="30%"
                        />
                        <SortableTree
                            treeData={treeData}
                            onChange={(treeData) => handleChangeTreeData(treeData)}
                            isVirtualized={false}
                            searchQuery={searchString}
                            searchFocusOffset={searchFocusIndex}
                            searchFinishCallback={(matches) => {
                                setSearchFocusIndex(matches.length > 0 ? searchFocusIndex % matches.length : 0);
                            }}
                            canDrag={({ node }) => !node.dragDisabled}
                            getNodeKey={({ node }) => node.id}
                            onMoveNode={({ node, nextParentNode, nextTreeIndex }) => handleDragNode(node, nextParentNode, nextTreeIndex)}
                            generateNodeProps={({ node, path }) => ({
                                buttons: [
                                    <div>
                                        {node.name}
                                        <span className={scss.button} onClick={() => handleEdit(node.id)}>
                                            <Icon className={scss.button}>edit</Icon>
                                        </span>
                                        <span className={scss.button} onClick={() => handleDelete(node.id)}>
                                            <Icon className={scss.button}>delete</Icon>
                                        </span>
                                        {openTextBox.open && openTextBox.id === node.id ? (
                                            <TextBoxSingle
                                                name="child"
                                                value={addChild.name}
                                                onSaveClick={(event) => saveChild(path)}
                                                onCancelClick={cancelChild}
                                                onChange={(e) => handleChild(e, node.id)}
                                                saveIcon="check_circle"
                                                cancelIcon="cancel"
                                                width="100%"
                                                className={scss.treeInput}
                                            />
                                        ) : (
                                            <span className={scss.button} onClick={() => handleOpenTextBox(node.id)}>
                                                <Icon className={scss.button}>add</Icon>
                                            </span>
                                        )}
                                    </div>,
                                ],
                            })}
                        />
                    </>
                ) : (
                    renderTreeSkeletons()
                )}
            </PageWrapper>

            <DeleteDialog handleConfirm={handleDeleteConfirm} openDeleteDialog={openDeleteDialog} setOpenDeleteDialog={setOpenDeleteDialog} />
        </>
    );
};

export default TreeView;
