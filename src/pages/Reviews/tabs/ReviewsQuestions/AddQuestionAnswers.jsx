import { useParams } from "react-router-dom";
import PageWrapper from "../../../../components/shared/Layout/PageWrapper/PageWrapper";
import { Typography, CircularProgress, Alert } from "@mui/material";
import SimpleDataViewer from "../../../../components/shared/DataViewerFromJSON/SimpleDataViewer";
import { updateDataForDataViewer } from "../../utils/dataFiltering";
import { useSingleDataByUrlAndID } from "../../../../hooks/singleData";
import base_data from "./jsons/base_data.json";
import ReplyToReviewForm from "../../forms/ReplyToReviewForm";
import reply_form_fields from "./jsons/forms/reply_form_fields.json";

const AddQuestionAnswers = () => {
    const { nid } = useParams();
    const defaultURL = "admin/reviews/product-items-b2c/comments";

    const reviewID = nid;
    const { data: commentData, isLoading: commentsIsLoading, error: commentsError } = useSingleDataByUrlAndID(`${defaultURL}/basic-data/${reviewID}`, reviewID);

    return (
        <PageWrapper title={"Komentari: Osnovni podaci"} actions={[]} back={false}>
            {commentsIsLoading ? (
                <CircularProgress size={`1.5rem`} />
            ) : commentsError ? (
                <Alert severity="error">{error.response?.data?.message ?? error?.response?.data?.payload?.message ?? "Something went wrong"}</Alert>
            ) : (
                <>
                    {commentData && (
                        <>
                            <SimpleDataViewer data={updateDataForDataViewer(base_data, commentData)} />
                            <Typography variant="h5" sx={{ mt: 6, mb: 6 }}>
                                Odgovori na komentar
                            </Typography>
                        </>
                    )}
                    <ReplyToReviewForm formFields={reply_form_fields} defaultURL={defaultURL} id={reviewID} admin_name={"Administrator"} />
                </>
            )}
        </PageWrapper>
    );
};

export default AddQuestionAnswers;
