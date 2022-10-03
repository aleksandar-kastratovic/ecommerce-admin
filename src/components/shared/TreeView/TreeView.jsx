import { useEffect, useState } from "react";
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

import SortableTree from "react-sortable-tree";
import "react-sortable-tree/style.css";

import scss from "./TreeView.module.scss";

const TreeView = ({ apiUrl, deleteUrl, title, showDatePicker, modifyItems, additionalButtons = [], showNewButton = true, filters = {} }) => {
    const [treeDataAdapt, setTreeDataAdapt] = useState([]);

    // TODO data adapt parent child
    // TODO add new in tree
    // TODO search
    // TODO drag and drop functionality save to db?

    const api = useAPI();
    const navigate = useNavigate();
    const { gid } = useParams();
    const [search, setSearch] = useState("");

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
    const { data: response, isLoading, isError } = useQuery(["openDeleteDialog.mutate", openDeleteDialog.mutate, search], () => api.list(apiUrl, { search, ...filters }));

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
        // TODO This always triggers two request as we are changing two states in a row
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
        if (response?.payload.items) {
            setTreeDataAdapt(response?.payload.items);
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

    return (
        <>
            <PageWrapper title={title} actions={actions}>
                <ListTableToolbar onSearch={handleSearch} showDatePicker={showDatePicker} />
                <Button sx={{ mt: "1rem" }} icon={"arrow_back"} label="Nazad" onClick={backToCategories} />

                {!isLoading ? (
                    <SortableTree
                        isVirtualized={false}
                        treeData={treeDataAdapt}
                        onChange={(treeData) => console.log(treeData)}
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
                ) : (
                    renderTreeSkeletons()
                )}
            </PageWrapper>

            <DeleteDialog handleConfirm={handleDeleteConfirm} openDeleteDialog={openDeleteDialog} setOpenDeleteDialog={setOpenDeleteDialog} />
        </>
    );
};

export default TreeView;
