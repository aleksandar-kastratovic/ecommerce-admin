import { useContext, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../../store/auth-contex";
import basic_data from "./jsons/reply_to_review_form.json";
import Form from "../../../components/shared/Form/Form";
import { useDispatch } from "react-redux";
import { triggerListPageReload } from "../../../store/reloads/reloadsReducer";

const ReplyToReviewForm = ({ id, setOpenModal }) => {
    const dispatch = useDispatch();
    const authCtx = useContext(AuthContext);
    const { api } = authCtx;

    const [isLoading, setIsLoading] = useState(false);
    const handlerSubmitForm = (data) => {
        setIsLoading(true);

        api.post(`admin/reviews/product-items-b2c/marks/reply`, { ...data, id, ...(data.sent_mail ? data.sent_mail : { sent_mail: 0 }) })
            .then(() => {
                toast.success("Uspešno!");
                setOpenModal({ show: false });
                dispatch(triggerListPageReload());
                setIsLoading(false);
            })
            .catch(() => {
                toast.warn("Greška");
                setIsLoading(false);
                setOpenModal({ show: false });
            });
    };

    return (
        <div style={{ marginTop: "32px" }}>
            <Form formFields={basic_data} initialData={{}} onSubmit={handlerSubmitForm} isLoading={isLoading} />
        </div>
    );
};

export default ReplyToReviewForm;
