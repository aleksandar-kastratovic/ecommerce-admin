import ListPageModalWrapper from "../../../components/shared/Modal/ListPageModalWrapper";
import { Box } from "@mui/material";
import PrintTextualInfo from "./PrintTextualInfo";
import ReplyToReviewForm from "../forms/ReplyToReviewForm";

const ReplyModal = ({ openModal, setOpenModal }) => {
    console.log("openModal", openModal);

    const data = openModal?.data;
    const { product_name = "", name = "", display_comment, mark, id } = data ? data : {};

    return (
        <ListPageModalWrapper
            anchor="right"
            open={openModal.show ?? false}
            onClose={() => setOpenModal({ ...openModal, show: false })}
            onCloseButtonClick={() => setOpenModal({ ...openModal, show: false })}
        >
            <Box sx={{ padding: "2rem" }}>
                <PrintTextualInfo mainTitle="Odgovor na recenziju" product_name={product_name} author_name={name} comment={display_comment} mark={mark} />
                <ReplyToReviewForm id={id} setOpenModal={setOpenModal} />
            </Box>
        </ListPageModalWrapper>
    );
};

export default ReplyModal;
