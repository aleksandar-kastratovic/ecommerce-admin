import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import ListItem from "./ListItem";

import styles from "./List.module.scss";
import useAPI from "../../../../../api/api";

const List = ({ onDelete = () => {}, productId }) => {
    const [fields, setFields] = useState([]);
    const api = useAPI();

    const setListHandler = async () => {
        api.get(`admin/product-items/specifications/product/${productId}`)
            .then((response) => {
                setFields(response?.payload);
            })
            .catch((error) => {
                console.warn(error);
            });
    };

    const deleteHandler = async (id, dataId) => {
        let newFields = [...fields.slice(0, id), ...fields.slice(id + 1)];
        setFields([...newFields]);
    };

    const addFieldHandler = () => {
        setFields([...fields, {}]);
    };

    useEffect(() => {
        setListHandler();
    }, []);

    return (
        <div className={styles.list}>
            <div className={styles.buttonsHolder}>
                <Button onClick={addFieldHandler} className={styles.buttonPrimary}>
                    Add field
                </Button>
            </div>
            {fields.map((field, index) => {
                return (
                    <ListItem
                        key={field.id ? field.id : `${index}new`}
                        index={index}
                        onDelete={deleteHandler}
                        selectedSet={field.id_set ?? undefined}
                        productId={productId}
                        productVariantId={field.id_product_variant ?? 0}
                    />
                );
            })}
        </div>
    );
};

export default List;
