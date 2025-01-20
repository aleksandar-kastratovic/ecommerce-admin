import { useParams, useLocation } from "react-router-dom";
import PageWrapper from "../../../../components/shared/Layout/PageWrapper/PageWrapper";
import { Typography, CircularProgress, Alert } from "@mui/material";
import ChangeReviewStatusForm from "../../forms/ChangeReviewStatusForm";
import SimpleDataViewer from "../../../../components/shared/DataViewerFromJSON/SimpleDataViewer";
import ListPage from "../../../../components/shared/ListPage/ListPage";
import tbFields from "./jsons/reviewsQuestionsDetailsTbFields.json";
import { updateDataForDataViewer } from "../../utils/dataFiltering";
import { useSingleDataByUrlAndID } from "../../../../hooks/singleData";
import status_form_fields from "./jsons/forms/status_form_fields.json";
import base_data from "./jsons/base_data.json";

const ReviewsQuestionDetails = () => {
    const { nid } = useParams();
    const { pathname } = useLocation();
    const defaultURL = "admin/reviews/product-items-b2c/questions-and-answers";
    const listPageComponentId = "reviewsQuestions";

    const reviewID = nid;
    const { data: questionData, isLoading: questionsIsLoading, error: questionsError } = useSingleDataByUrlAndID(`${defaultURL}/basic-data/${reviewID}`, reviewID);
console.log("questionData",questionData)
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
        <PageWrapper title={"Pitanja i odgovori: Osnovni podaci"} actions={[]} back={true}>
            {questionsIsLoading ? (
                <CircularProgress size={`1.5rem`} />
            ) : questionsError ? (
                <Alert severity="error">{error.response?.data?.message ?? error?.response?.data?.payload?.message ?? "Something went wrong"}</Alert>
            ) : (
                <>
                    {questionData && (
                        <>
                            <SimpleDataViewer data={updateDataForDataViewer(base_data, questionData)} />
                            <ChangeReviewStatusForm
                                formFields={status_form_fields}
                                defaultURL={defaultURL}
                                id={questionData.id}
                                initialStatus={questionData.status !== "new" ? questionData.status : {}}
                                listPageComponentId={listPageComponentId}
                            />

                            {questionData.id_parent === null && (
                                <>
                                    <Typography variant="h5" sx={{ mt: 6, mb: 6 }}>
                                        Odgovori na komentar
                                    </Typography>
                                    <ListPage
                                        listPageId="reviewsQuestionDetails"
                                        apiUrl={`/admin/reviews/product-items-b2c/questions-and-answers/replies/${reviewID}`}
                                        title=" "
                                        columnFields={tbFields}
                                        showNewButton={!questionData.id_parent ? true : false}
                                        customActions={customActions}
                                        customNewButtonPath={`${pathname}/answers/new`}
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

export default ReviewsQuestionDetails;
