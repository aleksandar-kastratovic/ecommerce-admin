import { Box } from "@mui/system";
import { useState } from "react";
import CreateForm from "../../../../../components/shared/Form/CreateForm";
import DeleteDialog from "../../../../../components/shared/Dialogs/DeleteDialog";

import styles from "./SetFormFields.module.scss";
import { Icon } from "@mui/material";
import { useEffect } from "react";
import GroupField from "./GroupField";
import chooseSetForm from "../chooseSetForm.json";
import IconList from "../../../../../helpers/icons";
import useAPI from "../../../../../api/api";
import { useNavigate } from "react-router-dom";

const ListItem = ({ index, onDelete = () => {}, title = "", selectedSet = undefined, productId, apiPath, listHandler }) => {
    const [loaded, setLoaded] = useState(false);
    const [open, setOpen] = useState(false);

    //delected set
    const [selected, setSetlected] = useState(selectedSet);

    //set groups
    const [groups, setGroups] = useState([]);
    const [set, setSet] = useState({});

    const [ddlDisabled, setDdlDisabled] = useState(false);
    const [showEmptyMessage, setShowEmptyMessage] = useState(false);
    const navigate = useNavigate();

    const api = useAPI();

    const [openDeleteDialog, setOpenDeleteDialog] = useState({
        show: false,
        id: null,
        mutate: null,
    });

    const formItemChangeHandler = ({ target }, type) => {
        setSetlected(target.value);
    };

    const deleteHandler = () => {
        onDelete(index, selectedSet);
        setOpenDeleteDialog({ show: false, id: null, mutate: 1 });
    };

    const onClickDelete = () => {
        setOpenDeleteDialog({ show: true, id: null, mutate: null });
    };

    const handleCancel = () => {
        setOpenDeleteDialog({ show: false, id: null });
    };

    const groupsChangeHandler = async () => {
        api.get(`${apiPath}/set-groups/${selected}`)
            .then((response) => {
                setSet(response?.payload?.set);
                setGroups(response?.payload?.groups);
            })
            .catch((error) => console.warn(error));
    };

    useEffect(() => {
        if (loaded && selected) {
            groupsChangeHandler();
        }
    }, [selected, loaded]);

    useEffect(() => {
        setLoaded(true);
    }, []);

    const changeHandler = (data) => {
        const isEmpty = Object.values(data).every((x) => x === null || x === "");
        setDdlDisabled(!isEmpty);
    };

    let setSelect = {
        ...chooseSetForm,
        fillFromApi: `${chooseSetForm.fillFromApi}/${productId}`,
    };

    return (
        <div>
            <div className={styles.formFieldHeader}>
                <div className={styles.formFieldTitle}>
                    <div onClick={() => setOpen(!open)}>
                        {title}
                        <Icon>{open ? IconList.expandLess : IconList.expandMore}</Icon>
                    </div>

                    <Icon onClick={onClickDelete} className={styles.deleteButton}>
                        {IconList.delete}
                    </Icon>
                </div>
                {open && (
                    <Box component="form" autoComplete="off" className={styles.setField}>
                        {selectedSet === undefined && (
                            <CreateForm
                                data-test-id="form"
                                onChangeHandler={formItemChangeHandler}
                                item={setSelect}
                                key={index}
                                value={selected}
                                disabled={ddlDisabled}
                                optionsIsEmpty={(isEmpty) => {
                                    setShowEmptyMessage(isEmpty);
                                }}
                            />
                        )}
                        {showEmptyMessage && (
                            <p>
                                Nema setova za prikaz. <a href="/product-specs/new">Kreiraj novi set</a>
                            </p>
                        )}
                    </Box>
                )}
            </div>

            {open && (
                <>
                    {groups.map((group) => {
                        return (
                            <div className={styles.section} key={group.id}>
                                <GroupField
                                    name={group.name}
                                    groupId={group.id}
                                    slug={group.slug}
                                    setId={set.id}
                                    slugSet={set.slug}
                                    nameSet={set.name}
                                    productId={productId}
                                    onChange={changeHandler}
                                    apiPath={apiPath}
                                    listHandler={listHandler}
                                />
                            </div>
                        );
                    })}
                </>
            )}
            <DeleteDialog
                title="Brisanje"
                description="Da li ste sigurni da želite da obrišete?"
                openDeleteDialog={openDeleteDialog}
                setOpenDeleteDialog={setOpenDeleteDialog}
                handleConfirm={deleteHandler}
                handleCancel={handleCancel}
            />
        </div>
    );
};

export default ListItem;
