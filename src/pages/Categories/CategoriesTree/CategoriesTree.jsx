import { useNavigate, useParams } from "react-router-dom";
import TreeView from "../../../components/shared/TreeView/TreeView";
import tblFields from "./tblFields.json";
import ModalContent from "./ModalContent";
import { toast } from "react-toastify";
import useAPI from "../../../api/api";
import { useState } from "react";

const CategoriesTree = () => {
    const { gid } = useParams();
    const api = useAPI();
    const navigate = useNavigate();

    let buttons = [
        {
            id: 1,
            label: "Grupe",
            action: () => {
                navigate("/product-categories");
            },
        },
    ];

    const [restartTree, setRestartTree] = useState(true);

    const customActions = {
        delete: {
            clickHandler: {
                type: "dialog_delete",
                fnc: (rowData, handleDeleteModalData) => {
                    console.log("f1", rowData);
                    return {
                        show: true,
                        id: rowData.id,
                        mutate: null,
                        children: <ModalContent apiPath={`/admin/category-product/tree/message/${rowData.id}`} rowData={rowData} handleDeleteModalData={handleDeleteModalData} />,
                    };
                },
            },
            deleteClickHandler: {
                type: "dialog_delete",
                fnc: (rowData, deleteModalData) => {
                    console.log(rowData);
                    setRestartTree(false);
                    if (deleteModalData.all_fill) {
                        api.delete(`/admin/category-product/tree/confirm/${rowData.id}`, deleteModalData)
                            .then(() => {
                                toast.success("Zapis je uspešno obrisan");
                                setRestartTree(true);
                            })
                            .catch(() => {
                                toast.warning("Došlo je do greške prilikom brisanja");
                                setRestartTree(true);
                            });

                        return {
                            show: false,
                            id: rowData.id,
                            mutate: 1,
                        };
                    } else {
                        toast.warning("Potrebno je da povežete sve opcije koje se brišu");
                        return false;
                    }
                },
            },
        },
    };

    return (
        <>
            {restartTree && (
                <TreeView customActions={customActions} apiUrl={`/admin/category-product/tree/`} title="Kategorije" columnFields={tblFields} filters={{ id_category_product_group: gid }} />
            )}
        </>
    );
};

export default CategoriesTree;
