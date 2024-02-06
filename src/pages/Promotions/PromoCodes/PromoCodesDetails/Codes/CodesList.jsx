import tblFields from "../Codes/tblFields.json";
import { useState } from "react";
import ListPage from "../../../../../components/shared/ListPage/ListPage";
import { useParams } from "react-router-dom";
const CodesList = () => {
    const [formFields, setFormFields] = useState(tblFields);
    const { pid } = useParams();

    const customActions = {
        edit: {
            display: false,
        },
    };

    return (
        <ListPage
            title={` `}
            apiUrl={`admin/campaigns/promo-codes/codes/${pid}`}
            deleteUrl={`admin/campaigns/promo-codes/codes`}
            columnFields={formFields}
            showNewButton={true}
            customActions={customActions}
        />
    );
};

export default CodesList;
