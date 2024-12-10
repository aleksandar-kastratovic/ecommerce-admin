import { useEffect } from "react";
import ListPageModalWrapper from "../../../components/shared/Modal/ListPageModalWrapper";
import { Box } from "@mui/material";
import ReplyToReviewForm from "../forms/ReplyToReviewForm";
import SimpleDataViewer from "../../../components/shared/DataViewerFromJSON/SimpleDataViewer";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

import { updateDataForDataViewer } from "../utils/dataFiltering";
import { useSingleMarkData } from "../hooks/marksData";
import display_base_review_data from "./jsons/display_reply_review_data.json";

const ReplyModal = ({ openModal, setOpenModal }) => {
    const reviewID = openModal?.id;
    const apiURL = `admin/reviews/product-items-b2c/marks/reply/${reviewID}`;
    const { data, isLoading, error, refetch } = useSingleMarkData(apiURL, reviewID);

    useEffect(() => {
        if (openModal.show) {
            refetch();
        }
    }, [openModal.show, refetch]);

    return (
        <ListPageModalWrapper
            anchor="right"
            open={openModal.show ?? false}
            onClose={() => setOpenModal({ ...openModal, show: false })}
            onCloseButtonClick={() => setOpenModal({ ...openModal, show: false })}
        >
            <Box sx={{ padding: "2rem" }}>
                {isLoading ? (
                    <CircularProgress size={`1.5rem`} />
                ) : error ? (
                    <Alert severity="error">{error.response?.data?.message ?? error?.response?.data?.payload?.message ?? "Something went wrong"}</Alert>
                ) : (
                    <>
                        {data && (
                            <>
                                <SimpleDataViewer mainTitle="Osnovni podaci" data={updateDataForDataViewer(display_base_review_data, data)} />{" "}
                                <ReplyToReviewForm id={data.id} admin_name={data.admin_name} setOpenModal={setOpenModal} />
                            </>
                        )}
                    </>
                )}
            </Box>
        </ListPageModalWrapper>
    );
};

export default ReplyModal;
