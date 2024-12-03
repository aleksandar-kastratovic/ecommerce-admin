import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ListPage from "../../../components/shared/ListPage/ListPage";
import tblFields from "./tbFields.json";
import BasicDataModal from "../components/BasicDataModal";

const ReviewsRatings = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [activeModal, setActiveModal] = useState(null);
    const [openModal, setOpenModal] = useState({ show: false, data: null });

    const customActions = {
        edit: {
            type: "custom",
            display: false,
        },
        modal_form: {
            type: "custom",
            display: true,
            position: 1,
            clickHandler: {
                type: "navigate",
                fnc: (rowData) => {
                    return setOpenModal({ show: true, userId: rowData.id });
                },
            },
        },
        key: {
            type: "custom",
            display: true,
            position: 3,
            clickHandler: {
                type: "",
                fnc: (rowData) => {
                    setActiveModal("info");
                    return setOpenModal({ show: true, data: rowData });
                },
            },
            icon: "info",
            title: "Osnovni podaci",
        },
    };

    return (
        <>
            <ListPage
                listPageId="reviewsRatings"
                apiUrl="admin/reviews/product-items-b2c/marks/list"
                deleteUrl="admin/reviews/product-items-b2c/marks/list"
                title="Test"
                showNewButton={false}
                columnFields={tblFields}
                // showNewButton={false}
                customActions={customActions}
                // customNewButtonPath={`${pathname}/reviews-ratings/new`}
            />
            <BasicDataModal openModal={openModal} setOpenModal={setOpenModal} apiUrl="admin/reviews/product-items-b2c/marks/basic-data" />
        </>
    );
};

export default ReviewsRatings;
