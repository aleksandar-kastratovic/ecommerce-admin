import { useNavigate } from "react-router-dom";
import { useState } from "react";
import IconList from "../../helpers/icons";
import DetailsPage from "../../components/shared/ListPage/DetailsPage/DetailsPage";
import { getUrlQueryStringParam, setUrlQueryStringParam } from "../../helpers/functions";
import ReviewsMarks from "./tabs/ReviewsMarks/ReviewsMarks";
import ReviewsComments from "./tabs/ReviewsComments/ReviewsComments";
import ReviewsQuestions from "./tabs/ReviewsQuestions/ReviewsQuestions";

const Reviews = () => {
    const activeTab = getUrlQueryStringParam("tab") ?? "ratingsMarks";
    const navigate = useNavigate();

    const fields = [
        {
            id: "ratingsMarks",
            name: "Ocene",
            icon: IconList.star,
            enabled: true,
            component: <ReviewsMarks />,
            title: "Ocene",
        },
        {
            id: "ratingsComments",
            name: "Komentari",
            icon: IconList.comment,
            enabled: true,
            component: <ReviewsComments />,
            title: "Komentari",
        },
        {
            id: "ratingsQuestions",
            name: "Pitanja i odgovori",
            icon: IconList.questionMark,
            enabled: true,
            component: <ReviewsQuestions />,
            title: "Pitanja i odgovori",
        },
    ];

    const [pageTitle, setPageTitle] = useState(`${fields.find((field) => field.id === activeTab)?.name}`);

    // Handle after click on tab panel
    const panelHandleSelect = (field) => {
        let queryString = setUrlQueryStringParam("tab", field.id);
        navigate(`?${queryString}`, { replace: true });
        setPageTitle(`${field.title}`);
    };

    return <DetailsPage title={pageTitle} fields={fields} selectedPanel={activeTab} panelHandleSelect={panelHandleSelect} />;
};

export default Reviews;
