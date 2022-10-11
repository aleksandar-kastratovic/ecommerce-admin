import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import ListTableToolbar from "../ListTable/ListTableToolbar";
import DeleteDialog from "../Dialogs/DeleteDialog";
import PageWrapper from "../Layout/PageWrapper/PageWrapper";
import Button from "../Button/Button";

import Icon from "@mui/material/Icon";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import { useQuery } from "react-query";
import useAPI from "../../../api/api";

import SortableTree, { addNodeUnderParent, toggleExpandedForAll } from "react-sortable-tree";
import "react-sortable-tree/style.css";

import scss from "./TreeView.module.scss";

const TreeView = ({ mockData, apiUrl, deleteUrl, title, showDatePicker, modifyItems, additionalButtons = [], showNewButton = true, filters = {} }) => {
    const [treeData, setTreeData] = useState([]);

    const api = useAPI();
    const navigate = useNavigate();
    const { gid } = useParams();
    const [search, setSearch] = useState("");

    const [searchString, setSearchString] = useState("");
    const [searchFocusIndex, setSearchFocusIndex] = useState(0);
    const inputEl = useRef();

    // Default delete URL is the same as the main URL
    deleteUrl = deleteUrl ?? apiUrl;

    // Handle delete dialog
    const [openDeleteDialog, setOpenDeleteDialog] = useState({ show: false, id: null, mutate: null });
    const handleDeleteConfirm = async () => {
        api.delete(`${deleteUrl}/${openDeleteDialog.id}`)
            .then(() => toast.success("Zapis je uspešno obrisan"))
            .catch(() => toast.warning("Došlo je do greške prilikom brisanja"));

        setOpenDeleteDialog({ show: false, id: null, mutate: 1 });
    };

    // Load the data
    const { data: response, isLoading, isError } = useQuery(["openDeleteDialog.mutate", openDeleteDialog.mutate, search], () => api.get(apiUrl, { search, ...filters }));

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

    useEffect(() => {
        if (response?.payload) {
            setTreeData(response?.payload);
            // setTreeData(mockData);
        }
    }, [isLoading]);

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

    const handleChange = (treeData) => {
        setTreeData(treeData);
    };

    const createNode = () => {
        const value = inputEl.current.value;

        if (value === "") {
            inputEl.current.focus();
            return;
        }

        let newTree = addNodeUnderParent({
            treeData: treeData,
            parentKey: null,
            expandParent: true,
            getNodeKey,
            newNode: {
                id: "123",
                title: value,
            },
        });

        setTreeData(newTree.treeData);

        inputEl.current.value = "";
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
                        <input ref={inputEl} type="text" placeholder="Dodaj novi" />
                        <span className={scss.button} onClick={createNode}>
                            <Icon className={scss.button}>
                                <span className="material-symbols-outlined">
                                    <span className="material-symbols-outlined">add</span>
                                </span>
                            </Icon>
                        </span>
                        <SortableTree
                            treeData={treeData}
                            onChange={(treeData) => handleChange(treeData)}
                            isVirtualized={false}
                            searchQuery={searchString}
                            searchFocusOffset={searchFocusIndex}
                            searchFinishCallback={(matches) => {
                                setSearchFocusIndex(matches.length > 0 ? searchFocusIndex % matches.length : 0);
                            }}
                            canDrag={({ node }) => !node.dragDisabled}
                            getNodeKey={({ node }) => node.id}
                            generateNodeProps={({ node }) => ({
                                buttons: [
                                    <div>
                                        {node.name}

                                        <span className={scss.button} onClick={() => handleEdit(node.id)}>
                                            <Icon className={scss.button}>edit</Icon>
                                        </span>
                                        <span className={scss.button} onClick={() => handleDelete(node.id)}>
                                            <Icon className={scss.button}>delete</Icon>
                                        </span>
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
