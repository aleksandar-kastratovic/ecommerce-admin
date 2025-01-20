import { useState, useContext } from "react";
import ListPage from "../../../../components/shared/ListPage/ListPage";
import tblFields from "../../../Reviews/tabs/ReviewsQuestions/jsons/tbFields.json";
import status_form_fields from "../../../Reviews/tabs/ReviewsQuestions/jsons/forms/status_form_fields.json";
import reply_form_fields from "../../../Reviews/tabs/ReviewsQuestions/jsons/forms/reply_form_fields.json";
import reply_base_data from "../../../Reviews/tabs/ReviewsQuestions/jsons/reply_base_data.json";
import base_data from "../../../Reviews/tabs/ReviewsQuestions/jsons/base_data.json";
import { PreviewDataModal, ReplyModal } from "../../../Reviews/components";
import IconList from "../../../../helpers/icons";
import AuthContext from "../../../../store/auth-contex";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { triggerComponentRerender } from "../../../../store/reloads/reloadsReducer";

const Questions = ({ productId }) => {
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
                if (rowData?.approve_reject_required === true) {
                    return false;
                }
                return true;
            },
            position: 1,
            clickHandler: {
                type: "",
                fnc: (rowData) => {
                    api.post(`admin/reviews/product-items-b2c/questions-and-answers/list/approve`, { id: rowData.id })
                        .then(() => {
                            toast.success("Uspešno prihvaćena recenzija!");
                            dispatch(triggerComponentRerender("reviewsQuestions"));
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
                if (rowData?.approve_reject_required === true) {
                    return false;
                }
                return true;
            },
            position: 2,
            clickHandler: {
                type: "",
                fnc: (rowData) => {
                    api.post(`admin/reviews/product-items-b2c/questions-and-answers/list/reject`, { id: rowData.id })
                        .then(() => {
                            toast.success("Uspešno odbijena recenzija!");
                            dispatch(triggerComponentRerender("reviewsQuestions"));
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
                type: "navigate",
                fnc: (rowData) => {
                    return `/reviews/question-details/${rowData.id_parent}`;
                },
            },
            icon: IconList.comment,
            title: "Glavni komentar",
        },

        key: {
            type: "preview",
            display: true,
            position: 5,
            clickHandler: {
                type: "navigate",
                fnc: (rowData) => {
                    return `/reviews/question-details/${rowData.id}?page=1`;
                },
            },
            icon: "preview",
            title: "Pregledaj",
        },
    };

    return (
        <>
            <ListPage
                listPageId="reviewsQuestions"
                apiUrl={`admin/product-items/reviews/product-items-b2c/questions-and-answers/list/${productId}`}
                deleteUrl={`admin/product-items/reviews/product-items-b2c/questions-and-answers/list/${productId}/confirm`}
                showNewButton={false}
                columnFields={tblFields}
                customActions={customActions}
            />
            <PreviewDataModal
                openModal={openPreviewModal}
                setOpenModal={setOpenPreviewModal}
                defaultURL={`admin/product-items/reviews/product-items-b2c/questions-and-answers/list/${productId}`}
                immutableData={{
                    listPageComponentId: "reviewsQuestions",
                    status_form_fields,
                    base_data,
                }}
            />
            <ReplyModal
                defaultURL={`admin/product-items/reviews/product-items-b2c/questions-and-answers/list/${productId}`}
                openModal={openReplyModal}
                setOpenModal={setOpenReplyModal}
                immutableData={{
                    listPageComponentId: "reviewsQuestions",
                    reply_base_data,
                    reply_form_fields,
                }}
            />
        </>
    );
};

export default Questions;
