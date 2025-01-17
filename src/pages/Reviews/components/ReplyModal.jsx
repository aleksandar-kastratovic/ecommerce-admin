import { useEffect } from "react";
import ListPageModalWrapper from "../../../components/shared/Modal/ListPageModalWrapper";
import { Box } from "@mui/material";
import ReplyToReviewForm from "../forms/ReplyToReviewForm";
import SimpleDataViewer from "../../../components/shared/DataViewerFromJSON/SimpleDataViewer";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

import { updateDataForDataViewer } from "../utils/dataFiltering";
import { useSingleDataByUrlAndID } from "../../../hooks/singleData";

const ReplyModal = ({ defaultURL, openModal, setOpenModal, immutableData }) => {
    const reviewID = openModal?.id;
    const { listPageComponentId, reply_base_data, reply_form_fields } = immutableData;

    const apiURL = `${defaultURL}/reply/${reviewID}`;
    const { data, isLoading, error, refetch } = useSingleDataByUrlAndID(apiURL, reviewID);

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
                                <SimpleDataViewer mainTitle="Osnovni podaci" data={updateDataForDataViewer(reply_base_data, data)} />{" "}
                                <ReplyToReviewForm
                                    formFields={reply_form_fields}
                                    defaultURL={defaultURL}
                                    id={data.id}
                                    admin_name={data.admin_name}
                                    setOpenModal={setOpenModal}
                                    listPageComponentId={listPageComponentId}
                                />
                            </>
                        )}
                    </>
                )}
            </Box>
        </ListPageModalWrapper>
    );
};

export default ReplyModal;
