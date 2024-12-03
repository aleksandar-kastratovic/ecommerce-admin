import { useNavigate } from "react-router-dom";
import { useState } from "react";
import IconList from "../../helpers/icons";
import DetailsPage from "../../components/shared/ListPage/DetailsPage/DetailsPage";
import { getUrlQueryStringParam, setUrlQueryStringParam } from "../../helpers/functions";
import ReviewsRatings from "./ReviewsRatings/ReviewsRatings";

const Reviews = () => {
    const activeTab = getUrlQueryStringParam("tab") ?? "ratings";
    const navigate = useNavigate();

    const fields = [
        {
            id: "ratings",
            name: "Ocene",
            icon: IconList.star,
            enabled: true,
            component: <ReviewsRatings />,
            title: "Ocene",
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
