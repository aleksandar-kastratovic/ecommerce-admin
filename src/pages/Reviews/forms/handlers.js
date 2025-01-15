import { toast } from "react-toastify";
import { triggerComponentRerender } from "../../../store/reloads/reloadsReducer";

export const handleReviewStatusSubmit =
    ({ defaultURL, id, api, dispatch, setOpenModal, setIsLoading, listPageComponentId }) =>
    (data) => {
        setIsLoading(true);

        api.post(`${defaultURL}/basic-data`, { ...data, id, ...(data.sent_mail ? data.sent_mail : { sent_mail: 0 }) })
            .then(() => {
                toast.success("Uspešno!");
                setOpenModal({ show: false });
                dispatch(triggerComponentRerender(listPageComponentId));
                setIsLoading(false);
            })
            .catch(() => {
                toast.warn("Greška");
                setIsLoading(false);
                setOpenModal({ show: false });
            });
    };

export const handleReviewReplySubmit =
    ({ defaultURL, id, api, dispatch, setOpenModal, setIsLoading, listPageComponentId }) =>
    (data) => {
        setIsLoading(true);

        api.post(`${defaultURL}/reply`, { ...data, id, ...(data.sent_mail ? data.sent_mail : { sent_mail: 0 }) })
            .then(() => {
                toast.success("Uspešno!");
                setOpenModal({ show: false });
                dispatch(triggerComponentRerender(listPageComponentId));
                setIsLoading(false);
            })
            .catch(() => {
                toast.warn("Greška");
                setIsLoading(false);
                setOpenModal({ show: false });
            });
    };
