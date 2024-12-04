import { useState, useContext } from "react";
import ListPage from "../../../components/shared/ListPage/ListPage";
import tblFields from "./tbFields.json";
import { PreviewDataModal, ReplyModal } from "../components";
import IconList from "../../../helpers/icons";
import AuthContext from "../../../store/auth-contex";
import { toast } from "react-toastify";

const ReviewsRatings = () => {
    const authCtx = useContext(AuthContext);
    const { api } = authCtx;
    const [openPreviewModal, setOpenPreviewModal] = useState({ show: false, data: null });
    const [openReplyModal, setOpenReplyModal] = useState({ show: false, data: null });

    const customActions = {
        edit: {
            type: "custom",
            display: false,
        },

        approve: {
            type: "approve",
            display: true,
            position: 1,
            clickHandler: {
                type: "",
                fnc: (rowData) => {
                    console.log("Odobri");

                    api.post(`admin/reviews/product-items-b2c/marks/list/approve`, { id: rowData.id })
                        .then(() => {
                            toast.success("Uspešno odobrena recenzija!");
                        })
                        .catch((error) => {
                            toast.warning(error.response.data.message ?? error?.response?.data?.payload?.message ?? "Greška");
                        });
                },
            },
            icon: IconList.thumbUp,
            title: "Odobri",
        },

        refuse: {
            type: "refuse",
            display: true,
            position: 1,
            clickHandler: {
                type: "",
                fnc: (rowData) => {
                    console.log("Odbij");
                    api.post(`admin/reviews/product-items-b2c/marks/list/reject`, { id: rowData.id })
                        .then(() => {
                            toast.success("Uspešno odbijena recenzija!");
                        })
                        .catch((error) => {
                            toast.warning(error.response.data.message ?? error?.response?.data?.payload?.message ?? "Greška");
                        });
                },
            },
            icon: IconList.thumbDown,
            title: "Odbij",
        },

        reply: {
            type: "reply",
            display: true,
            position: 2,
            clickHandler: {
                type: "",
                fnc: (rowData) => {
                    return setOpenReplyModal({ show: true, data: rowData });
                },
            },
            icon: "reply",
            title: "Odgovori",
        },

        key: {
            type: "preview",
            display: true,
            position: 3,
            clickHandler: {
                type: "",
                fnc: (rowData) => {
                    return setOpenPreviewModal({ show: true, data: rowData });
                },
            },
            icon: "preview",
            title: "Pregledaj",
        },
    };

    return (
        <>
            <ListPage
                listPageId="reviewsRatings"
                apiUrl="admin/reviews/product-items-b2c/marks/list"
                deleteUrl={`admin/reviews/product-items-b2c/marks/list/confirm`}
                showNewButton={false}
                columnFields={tblFields}
                customActions={customActions}
            />
            <PreviewDataModal openModal={openPreviewModal} setOpenModal={setOpenPreviewModal} />
            <ReplyModal openModal={openReplyModal} setOpenModal={setOpenReplyModal} />
        </>
    );
};

export default ReviewsRatings;
