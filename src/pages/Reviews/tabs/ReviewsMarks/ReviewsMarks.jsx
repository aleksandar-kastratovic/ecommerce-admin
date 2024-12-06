import { useState, useContext } from "react";
import ListPage from "../../../../components/shared/ListPage/ListPage";
import tblFields from "./tbFields.json";
import { PreviewDataModal, ReplyModal } from "../../components";
import IconList from "../../../../helpers/icons";
import AuthContext from "../../../../store/auth-contex";
import { toast } from "react-toastify";

const ReviewsMarks = () => {
    const authCtx = useContext(AuthContext);
    const { api } = authCtx;
    const [openPreviewModal, setOpenPreviewModal] = useState({ show: false, data: null });
    const [openReplyModal, setOpenReplyModal] = useState({ show: false, data: null });
    const [reloadList, setReloadList] = useState(false);
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
                    api.post(`admin/reviews/product-items-b2c/marks/list/approve`, { id: rowData.id })
                        .then(() => {
                            toast.success("Uspešno odobrena recenzija!");
                            setReloadList((prev) => !prev);
                        })
                        .catch((error) => {
                            toast.warning(error.response.data.message ?? error?.response?.data?.payload?.message ?? "Greška");
                        });
                },
            },
            icon: IconList.thumbUp,
            title: "Prihvati",
        },

        refuse: {
            type: "refuse",
            display: true,
            position: 1,
            clickHandler: {
                type: "",
                fnc: (rowData) => {
                    api.post(`admin/reviews/product-items-b2c/marks/list/reject`, { id: rowData.id })
                        .then(() => {
                            toast.success("Uspešno odbijena recenzija!");
                            setReloadList((prev) => !prev);
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
                    return setOpenReplyModal({ show: true, id: rowData.id });
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
                    return setOpenPreviewModal({ show: true, id: rowData.id });
                },
            },
            icon: "preview",
            title: "Pregledaj",
        },
    };

    return (
        <>
            <ListPage
                listPageId="reviewsMarks"
                apiUrl="admin/reviews/product-items-b2c/marks/list"
                deleteUrl={`admin/reviews/product-items-b2c/marks/list/confirm`}
                showNewButton={false}
                columnFields={tblFields}
                customActions={customActions}
                reloadList={reloadList}
            />
            <PreviewDataModal openModal={openPreviewModal} setOpenModal={setOpenPreviewModal} setReloadList={setReloadList} />
            <ReplyModal openModal={openReplyModal} setOpenModal={setOpenReplyModal} setReloadList={setReloadList} />
        </>
    );
};

export default ReviewsMarks;
