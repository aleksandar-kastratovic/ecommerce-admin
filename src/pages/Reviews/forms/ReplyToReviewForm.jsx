import { useContext, useState } from "react";
import AuthContext from "../../../store/auth-contex";
import Form from "../../../components/shared/Form/Form";
import { useDispatch } from "react-redux";
import { handleReviewReplySubmit } from "./handlers";

const ReplyToReviewForm = ({ id, admin_name, setOpenModal, defaultURL, listPageComponentId, formFields }) => {
    const dispatch = useDispatch();
    const authCtx = useContext(AuthContext);
    const { api } = authCtx;

    const [isLoading, setIsLoading] = useState(false);

    const handlerSubmitForm = handleReviewReplySubmit({
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
            <Form formFields={formFields} initialData={{ admin_name }} onSubmit={handlerSubmitForm} isLoading={isLoading} />
        </div>
    );
};

export default ReplyToReviewForm;
