import { useState, useContext } from "react";
import ListPage from "../../../../components/shared/ListPage/ListPage";
import tblFields from "./tbFields.json";
import { PreviewDataModal, ReplyModal } from "../../components";
import IconList from "../../../../helpers/icons";
import AuthContext from "../../../../store/auth-contex";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { triggerListPageReload } from "../../../../store/reloads/reloadsReducer";

const ReviewsMarks = () => {
    const dispatch = useDispatch();
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
            display: (rowData) => {
                if (rowData?.status !== "Novo") {
                    return false;
                }
                return true;
            },
            position: 1,
            clickHandler: {
                type: "",
                fnc: (rowData) => {
                    if (rowData.status !== "Prihvaćeno")
                        api.post(`admin/reviews/product-items-b2c/marks/list/approve`, { id: rowData.id })
                            .then(() => {
                                toast.success("Uspešno prihvaćena recenzija!");
                                dispatch(triggerListPageReload());
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
            display: (rowData) => {
                if (rowData?.status !== "Novo") {
                    return false;
                }
                return true;
            },
            position: 2,
            clickHandler: {
                type: "",
                fnc: (rowData) => {
                    if (rowData.status !== "Odbijeno")
                        api.post(`admin/reviews/product-items-b2c/marks/list/reject`, { id: rowData.id })
                            .then(() => {
                                toast.success("Uspešno odbijena recenzija!");
                                dispatch(triggerListPageReload());
                            })
                            .catch((error) => {
                                toast.warning(error.response.data.message ?? error?.response?.data?.payload?.message ?? "Greška");
                            });
                },
            },
            icon: IconList.thumbDown,
            title: "Odbij",
            disabled: true,
        },


        parentComment: {
            type: "parentComment",
            display: (rowData) => {
                if (rowData?.id_parent !== null) {
                    return true;
                }
                return false;
            },
            position: 3,
            clickHandler: {
                type: "",
                fnc: (rowData) => {
                    return setOpenPreviewModal({ show: true, id: rowData.id_parent });
                },
            },
            icon: IconList.comment,
            title: "Glavni komentar",
        },


        reply: {
            type: "reply",
            display: true,
            position: 4,
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
            position: 5,
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
            />

            <PreviewDataModal openModal={openPreviewModal} setOpenModal={setOpenPreviewModal} />
            <ReplyModal openModal={openReplyModal} setOpenModal={setOpenReplyModal} />
        </>
    );
};

export default ReviewsMarks;
