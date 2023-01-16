import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import { values, mergeWith, isArray, uniqBy } from "lodash";

import ListTableToolbar from "../ListTable/ListTableToolbar";
import DeleteDialog from "../Dialogs/DeleteDialog";
import PageWrapper from "../Layout/PageWrapper/PageWrapper";
import Button from "../Button/Button";
import TextBoxSingle from "../TextBoxSingle/TextBoxSingle";

import Icon from "@mui/material/Icon";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

// import { useQuery } from "react-query";
import useAPI from "../../../api/api";
import { deleteByPath, getByPathAndParams, postPutByPathAndData } from "../../../api/services";
import useFetching from "../../../hooks/fetching";
import AuthContext from "../../../store/auth-contex";

import SortableTree, { addNodeUnderParent, toggleExpandedForAll, changeNodeAtPath } from "react-sortable-tree";
import "react-sortable-tree/style.css";
// https://github.com/frontend-collective/react-sortable-tree
// https://frontend-collective.github.io/react-sortable-tree/?path=/story/basics--minimal-implementation

import scss from "./TreeView.module.scss";
import { deepRemove, handleExpandedElements } from "./helper";

const TreeView = ({ apiUrl, deleteUrl, title, showDatePicker, modifyItems, additionalButtons = [], showNewButton = true, filters = {} }) => {
    const { user } = useContext(AuthContext);
    const [treeData, setTreeData] = useState([]);
    const api = useAPI();
    const navigate = useNavigate();
    const { gid } = useParams();

    const defaultHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
    };

    const [treeList, isLoadingTreeList, reFetchTreeList, setTreeList] = useFetching(
        getByPathAndParams.bind(null, {
            path: apiUrl + gid,
            headers: defaultHeaders,
        }),
        false
    );

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
        try {
            const response = await deleteByPath({
                path: deleteUrl + openDeleteDialog.id,
                pathVariables: { id: openDeleteDialog.id },
                headers: defaultHeaders,
            });
            // condition response or response.status === 200 for example
            if (response) {
                let tmp = JSON.parse(sessionStorage.getItem("treeItems"));

                let newArr = tmp ? deepRemove(tmp, openDeleteDialog.id) : null;
                sessionStorage.setItem("treeItems", JSON.stringify(newArr));
            }
        } catch (error) {
            console.warn(error);
            // customize message for example
            toast.warning("Greška nastala prilikom brisanja.");
        } finally {
            await reFetchTreeList();
            setOpenDeleteDialog({ show: false, id: null, mutate: 1 });
        }
    };

    useEffect(() => {
        if (openDeleteDialog.mutate === 1) {
            setOpenDeleteDialog({ show: false, id: null, mutate: 0 });
        }
    }, [openDeleteDialog.mutate]);

    useEffect(() => {
        if (treeList) {
            let expandedTreeItems = JSON.parse(sessionStorage.getItem("treeItems") || "[]");

            if (expandedTreeItems) {
                const merge = mergeWith({}, treeList, expandedTreeItems, (a, b) => {
                    if (!b) {
                        return;
                    }
                    if (isArray(a)) {
                        let concated = b.concat(a);
                        return uniqBy(concated, "id");
                    }
                });
                setTreeData(values(merge));
            } else {
                setTreeData(treeList);
            }
        } else {
            reFetchTreeList();
        }
    }, [isLoadingTreeList]);

    const handleSearch = (value) => {
        setSearchString(value);
    };

    const handleDelete = (id) => {
        setOpenDeleteDialog({ show: true, id: id, mutate: null });
    };

    const handleEdit = (id) => {
        // TODO make a dynamic path
        navigate(`/categories/category/${gid}/${id}`);
        sessionStorage.clear();
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
        handleExpandedElements(treeData);
        setTreeData(treeData);
    };

    const handleParent = (e) => {
        setAddParent({ ...addParent, name: e.target.value, order: treeData.length + 1 });
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

    const saveChild = (path, node) => {
        if (addChild.name === "") {
            return;
        }
        // in case that you only update UI use this method
        // let newTree = addNodeUnderParent({
        //     treeData: treeData,
        //     parentKey: path.length - 1,
        //     expandParent: true,
        //     getNodeKey,
        //     newNode: {
        //         id: Math.floor(Math.random() * 100) + 1,
        //         title: addChild.name,
        //     },
        // });

        saveData(addChild, "post");
        setOpenTextBox({ open: false, id: null });
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
        try {
            const response = await postPutByPathAndData({
                path: apiUrl,
                headers: defaultHeaders,
                data: data,
                method: method,
            });
            // condition response or response.status === 200 for example
            if (response) {
                // TODO instead of cleaning storage keep the state from storage and compare with existing to expand all childs
                sessionStorage.clear();
                toast.success(`Uspešno ${method === "put" ? "izmenjeni" : "dodati"} podaci`);
            }
        } catch (error) {
            console.warn(error);
            // customize message for example
            toast.warning(`Greška nastala prilikom ${method === "put" ? "izmene" : "dodavanja"} podataka`);
        } finally {
            await reFetchTreeList();
        }
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
        sessionStorage.clear();
    };

    const collapseAll = () => {
        expand(false);
        sessionStorage.clear();
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
            <PageWrapper back={true} title={title} actions={actions}>
                <ListTableToolbar onSearch={handleSearch} showDatePicker={showDatePicker} />
                {/* <Button sx={{ mt: "1rem" }} icon={"arrow_back"} label="Nazad" onClick={backToCategories} /> */}

                {!isLoadingTreeList ? (
                    <>
                        <div className={scss.buttonsDownUp}>
                            <span className={scss.button} onClick={expandAll}>
                                <Icon className={scss.button}>
                                    <span className="material-symbols-outlined">keyboard_double_arrow_down</span>
                                </Icon>
                                Proširi sve
                            </span>

                            <span className={scss.button} onClick={collapseAll}>
                                <Icon className={scss.button}>
                                    <span className="material-symbols-outlined">
                                        <span className="material-symbols-outlined">keyboard_double_arrow_up</span>
                                    </span>
                                </Icon>
                                Skupi sve
                            </span>
                        </div>
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
                                    <div className={scss.wrappEditDeleteAdd}>
                                        <div className={scss.name}>{node.name}</div>

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
                                                onSaveClick={(event) => saveChild(path, node)}
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
