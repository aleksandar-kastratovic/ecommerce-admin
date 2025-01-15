import { useEffect } from "react";
import ListPageModalWrapper from "../../../components/shared/Modal/ListPageModalWrapper";
import { Box } from "@mui/material";
import ChangeReviewStatusForm from "../forms/ChangeReviewStatusForm";
import CircularProgress from "@mui/material/CircularProgress";
import SimpleDataViewer from "../../../components/shared/DataViewerFromJSON/SimpleDataViewer";
import { updateDataForDataViewer } from "../utils/dataFiltering";
import { useSingleDataByUrlAndID } from "../../../hooks/singleData";
import Alert from "@mui/material/Alert";

const PreviewDataModal = ({ openModal, setOpenModal, defaultURL, immutableData }) => {
    const reviewID = openModal?.id;
    const { listPageComponentId, status_form_fields, base_data } = immutableData;
    const { data, isLoading, error, refetch } = useSingleDataByUrlAndID(`${defaultURL}/basic-data/${reviewID}`, reviewID);

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
                                <SimpleDataViewer mainTitle="Osnovni podaci" data={updateDataForDataViewer(base_data, data)} />{" "}
                                <ChangeReviewStatusForm
                                    formFields={status_form_fields}
                                    defaultURL={defaultURL}
                                    id={data.id}
                                    setOpenModal={setOpenModal}
                                    initialStatus={data.status !== "new" ? data.status : {}}
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

export default PreviewDataModal;
