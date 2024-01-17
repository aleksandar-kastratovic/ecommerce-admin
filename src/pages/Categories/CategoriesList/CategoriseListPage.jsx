import { useNavigate, useParams } from "react-router-dom";
import ListPage from "../../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";
import { useContext } from "react";
import AuthContext from "../../../store/auth-contex";
// import ModalContent from "../ModalContent";
import { toast } from "react-toastify";

const CategoriesListPage = () => {
    const { gid } = useParams();
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const { api } = authCtx;

    let buttons = [
        {
            id: 1,
            label: "Grupe",
            action: () => {
                navigate("/product-categories");
            },
        },
    ];

    const customActions = {
        delete: {
            clickHandler: {
                type: "dialog_delete",
                fnc: (rowData, handleDeleteModalData) => {
                    return {
                        show: true,
                        id: rowData.id,
                        mutate: null,
                        // children: (
                        //   <ModalContent apiPath={`admin/category-product/categories/${rowData.id}`} rowData={rowData} handleDeleteModalData={handleDeleteModalData} />
                        // )
                    };
                },
            },
            deleteClickHandler: {
                type: "dialog_delete",
                fnc: (rowData, data) => {
                    api.delete(`admin/category-product/categories/${rowData.id}`)
                        .then(() => toast.success("Zapis je uspešno obrisan"))
                        .catch(() => toast.warning("Došlo je do greške prilikom brisanja"));

                    return {
                        show: false,
                        id: rowData.id,
                        mutate: 1,
                    };
                },
            },
        },
    };

    return (
        <ListPage
            listPageId="CategoriesListPage"
            apiUrl={`admin/category-product/categories`}
            customActions={customActions}
            title="Kategorije"
            columnFields={tblFields}
            additionalButtons={buttons}
            filters={{ id_category_product_group: gid }}
        />
    );
};

export default CategoriesListPage;
