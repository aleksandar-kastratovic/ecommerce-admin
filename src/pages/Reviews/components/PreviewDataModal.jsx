import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import ListPageModalWrapper from "../../../components/shared/Modal/ListPageModalWrapper";
import AuthContext from "../../../store/auth-contex";
import { Box } from "@mui/material";
import PrintTextualInfo from "./PrintTextualInfo";
import ChangeReviewStatusForm from "../forms/ChangeReviewStatusForm";

const PreviewDataModal = ({ openModal, setOpenModal }) => {
    console.log("openModal", openModal);

    const authCtx = useContext(AuthContext);
    const { api } = authCtx;

    const [statusList, setStatusList] = useState();
    const [currentStatus, setCurrentStatus] = useState();

    const data = openModal?.data;
    const { product_name = "", status = "", name = "", display_comment, images = [], videos = [], mark, id } = data ? data : {};
    useEffect(() => {
        if (status)
            api.get("admin/reviews/product-items-b2c/marks/basic-data/ddl/review-status")
                .then((response) => {
                    setStatusList(response.payload);
                    setCurrentStatus(response.payload.find((statusObj) => statusObj.name == status));
                })
                .catch((error) => {
                    toast.error(error.response.data.message ?? error?.response?.data?.payload?.message ?? "Something went wrong");
                });
    }, [status]);

    return (
        <ListPageModalWrapper
            anchor="right"
            open={openModal.show ?? false}
            onClose={() => setOpenModal({ ...openModal, show: false })}
            onCloseButtonClick={() => setOpenModal({ ...openModal, show: false })}
        >
            <Box sx={{ padding: "2rem" }}>
                <PrintTextualInfo mainTitle="Osnovni podaci" product_name={product_name} author_name={name} comment={display_comment} mark={mark} images={images} videos={videos} />

                <ChangeReviewStatusForm id={id} currentStatus={currentStatus} setCurrentStatus={setCurrentStatus} setOpenModal={setOpenModal} statusList={statusList} oldStatus={status} />
            </Box>
        </ListPageModalWrapper>
    );
};

export default PreviewDataModal;
