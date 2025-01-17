import { useParams, useLocation } from "react-router-dom";
import PageWrapper from "../../../../components/shared/Layout/PageWrapper/PageWrapper";
import { Typography, CircularProgress, Alert } from "@mui/material";
import ChangeReviewStatusForm from "../..//forms/ChangeReviewStatusForm";
import SimpleDataViewer from "../../../../components/shared/DataViewerFromJSON/SimpleDataViewer";
import ListPage from "../../../../components/shared/ListPage/ListPage";
import tbFields from "./jsons/reviewsCommentsDetailsTbFields.json";
import { updateDataForDataViewer } from "../..//utils/dataFiltering";
import { useSingleDataByUrlAndID } from "../../../../hooks/singleData";
import status_form_fields from "./jsons/forms/status_form_fields.json";
import base_data from "./jsons/base_data.json";

const ReviewsCommentDetails = () => {
    const { nid } = useParams();
    const { pathname } = useLocation();
    const defaultURL = "admin/reviews/product-items-b2c/comments";
    const listPageComponentId = "reviewsComments";

    const reviewID = nid;
    const { data: commentData, isLoading: commentsIsLoading, error: commentsError, refetch: commentsRefetch } = useSingleDataByUrlAndID(`${defaultURL}/basic-data/${reviewID}`, reviewID);

    const customActions = {
        edit: {
            clickHandler: {
                type: "navigate",
                fnc: (rowData) => {
                    return `${pathname}/promotions-catalog-campaigns/${rowData.id}`;
                },
            },
        },
    };

    return (
        <PageWrapper title={"Komentari: Osnovni podaci"} actions={[]} back={true}>
            {commentsIsLoading ? (
                <CircularProgress size={`1.5rem`} />
            ) : commentsError ? (
                <Alert severity="error">{error.response?.data?.message ?? error?.response?.data?.payload?.message ?? "Something went wrong"}</Alert>
            ) : (
                <>
                    {commentData && (
                        <>
                            <SimpleDataViewer data={updateDataForDataViewer(base_data, commentData)} />
                            <ChangeReviewStatusForm
                                formFields={status_form_fields}
                                defaultURL={defaultURL}
                                id={commentData.id}
                                initialStatus={commentData.status !== "new" ? commentData.status : {}}
                                listPageComponentId={listPageComponentId}
                            />

                            {commentData.id_parent === null && (
                                <>
                                    <Typography variant="h5" sx={{ mt: 6, mb: 6 }}>
                                        Odgovori na komentar
                                    </Typography>
                                    <ListPage
                                        listPageId="ReviewsCommentDetailsTable"
                                        apiUrl={`/admin/reviews/product-items-b2c/comments/replies/${reviewID}`}
                                        title=" "
                                        columnFields={tbFields}
                                        showNewButton={!commentData.id_parent ? true : false}
                                        customActions={customActions}
                                        customNewButtonPath={`${pathname}/reply/new`}
                                    />
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </PageWrapper>
    );
};

export default ReviewsCommentDetails;
