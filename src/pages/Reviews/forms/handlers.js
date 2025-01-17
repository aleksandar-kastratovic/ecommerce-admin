import { toast } from "react-toastify";
import { triggerComponentRerender } from "../../../store/reloads/reloadsReducer";

export const handleReviewStatusSubmit =
    ({ defaultURL, id, api, dispatch, setOpenModal = false, setIsLoading = false, listPageComponentId }) =>
    (data) => {
        if (setIsLoading) setIsLoading(true);

        api.post(`${defaultURL}/basic-data`, { ...data, id, ...(data.sent_mail ? data.sent_mail : { sent_mail: 0 }) })
            .then(() => {
                toast.success("Uspešno!");
                if (setOpenModal) setOpenModal({ show: false });
                if (listPageComponentId) dispatch(triggerComponentRerender(listPageComponentId));
                if (setIsLoading) setIsLoading(false);
            })
            .catch(() => {
                toast.warn("Greška");
                if (setIsLoading) setIsLoading(false);
                if (setOpenModal) setOpenModal({ show: false });
            });
    };

export const handleReviewReplySubmit =
    ({ defaultURL, id, api, dispatch, setOpenModal = false, setIsLoading = false, listPageComponentId, refetch }) =>
    (data) => {
        if (setIsLoading) setIsLoading(true);

        api.post(`${defaultURL}/reply`, { ...data, id, ...(data.sent_mail ? data.sent_mail : { sent_mail: 0 }) })
            .then((response) => {
                toast.success("Uspešno!");
                if (setOpenModal) setOpenModal({ show: false });
                if (listPageComponentId) dispatch(triggerComponentRerender(listPageComponentId));
                if (setIsLoading) setIsLoading(false);
                if (refetch) refetch();
                return response;
            })
            .catch((error) => {
                toast.warn("Greška");
                if (setOpenModal) setIsLoading(false);
                if (setIsLoading) setOpenModal({ show: false });
                return error;
            });
    };
