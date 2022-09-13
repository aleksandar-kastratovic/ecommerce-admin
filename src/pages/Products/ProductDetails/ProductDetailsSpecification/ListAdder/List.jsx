import { useEffect, useState } from "react";
import ListItem from "./ListItem";

import styles from "./List.module.scss";
import useAPI from "../../../../../api/api";
import Button from "../../../../../components/shared/Button/Button";
import IconList from "../../../../../helpers/icons";
import { toast } from "react-toastify";

const List = ({ productId, apiPath }) => {
    const [fields, setFields] = useState([]);
    const [newDisabled, setNewDisabled] = useState(false);
    const api = useAPI();

    const setListHandler = async () => {
        api.get(`${apiPath}/product/sets/${productId}`)
            .then((response) => {
                setFields(response?.payload);
                setNewDisabled(false);
            })
            .catch((error) => {
                console.warn(error);
            });
    };

    const deleteHandler = async (id, dataId) => {
        api.delete(`${apiPath}/${productId}/${dataId}`)
            .then((response) => {
                toast.success("Uspešno");
                setListHandler();
            })
            .catch((error) => {
                toast.warn("Greška");
                console.warn(error);
            });

        /* let newFields = [...fields.slice(0, id), ...fields.slice(id + 1)];
        setFields([...newFields]); */
    };

    const addFieldHandler = () => {
        setFields([...fields, { name: "Novo" }]);
        setNewDisabled(true);
    };

    useEffect(() => {
        setListHandler();
    }, []);

    return (
        <div className={styles.list}>
            <div className={styles.buttonsHolder}>
                <Button onClick={addFieldHandler} label="Dodaj polje" icon={IconList.add} variant="contained" disabled={newDisabled} />
            </div>
            {fields.map((field, index) => {
                return (
                    <ListItem
                        key={field.id ? field.id : `${index}new`}
                        index={index}
                        onDelete={deleteHandler}
                        title={field.name}
                        selectedSet={field.id ?? undefined}
                        productId={productId}
                        apiPath={apiPath}
                        listHandler={setListHandler}
                    />
                );
            })}
        </div>
    );
};

export default List;
