import { useContext, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../../store/auth-contex";
import basic_data from "./jsons/replyToReview_basic_data.json";
import Form from "../../../components/shared/Form/Form";

const ReplyToReviewForm = ({ id, setOpenModal }) => {
    const authCtx = useContext(AuthContext);
    const { api } = authCtx;

    const [isLoading, setIsLoading] = useState(false);

    const handlerSubmitForm = (data) => {
        console.log("data", data);

        setIsLoading(true);

        api.post(`admin/reviews/product-items-b2c/marks/reply`, { ...data, id, ...(data.sent_mail ? data.sent_mail : { sent_mail: 0 }) })
            .then(() => {
                toast.success("Uspešno!");
                setOpenModal({ show: false });

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
