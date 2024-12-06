import ListPageModalWrapper from "../../../components/shared/Modal/ListPageModalWrapper";
import { Box } from "@mui/material";
import ChangeReviewStatusForm from "../forms/ChangeReviewStatusForm";
import CircularProgress from "@mui/material/CircularProgress";
import display_base_review_data from "./jsons/display_base_review_data.json";
import SimpleDataViewer from "../../../components/shared/DataViewerFromJSON/SimpleDataViewer";
import { updateDataForDataViewer } from "../utils/dataFiltering";
import { useSingleMarkData } from "../hooks/marksData";
import Alert from "@mui/material/Alert";

const PreviewDataModal = ({ openModal, setOpenModal, setReloadList }) => {
    const reviewID = openModal?.id;
    const apiURL = `admin/reviews/product-items-b2c/marks/basic-data/${reviewID}`;
    const { data, isLoading, error } = useSingleMarkData(apiURL, reviewID);

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
                                <ChangeReviewStatusForm id={data.id} setOpenModal={setOpenModal} initialStatus={data.status} setReloadList={setReloadList} />
                            </>
                        )}
                    </>
                )}
            </Box>
        </ListPageModalWrapper>
    );
};

export default PreviewDataModal;
