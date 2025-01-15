import { useContext, useState } from "react";
import AuthContext from "../../../store/auth-contex";
import Form from "../../../components/shared/Form/Form";
import { useDispatch } from "react-redux";
import { handleReviewStatusSubmit } from "./handlers";

const ChangeReviewStatusForm = ({ defaultURL, id, setOpenModal, initialStatus, formFields, listPageComponentId }) => {
    const dispatch = useDispatch();
    const authCtx = useContext(AuthContext);
    const { api } = authCtx;

    const [isLoading, setIsLoading] = useState(false);

    const handlerSubmitForm = handleReviewStatusSubmit({
        id,
        api,
        dispatch,
        setOpenModal,
        setIsLoading,
        defaultURL,
        listPageComponentId,
    });

    return (
        <div style={{ marginTop: "32px" }}>
            <Form formFields={formFields} initialData={{ status: initialStatus }} onSubmit={handlerSubmitForm} isLoading={isLoading} />
        </div>
    );
};

export default ChangeReviewStatusForm;
