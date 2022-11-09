import { Box } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../api/api";
import Button from "../../../components/shared/Button/Button";
import Buttons from "../../../components/shared/Form/Buttons/Buttons";
import { InputCheckbox, InputSelect, InputText } from "../../../components/shared/Form/FormInputs/FormInputs";
import HistoryModal from "./HistoryModal";

const OrderStatus = ({ orderId, status }) => {
    const api = useAPI();
    const apiPath = "admin/orders-b2c/status";

    const init = { id_order: orderId, status, send_to_customer: null, send_default_message: null, title: null, description: "", mail_to_customer: null, mail_to_admin: null };

    const [data, setData] = useState(init);
    const [originalMessage, setOriginalMessage] = useState(data.message);
    const [openDialog, setOpenDialog] = useState({ show: false });

    const getMessage = (statusCode) => {
        api.get(`${apiPath}/message/${orderId}/${statusCode}`)
            .then((response) => {
                setOriginalMessage(response?.payload.message);
                setData({ ...data, description: response?.payload.message });
            })
            .catch((error) => console.warn(error));
    };

    useEffect(() => {
        getMessage(data.status);
    }, [data.status]);

    const formSubmitHandler = () => {
        api.post(apiPath, { ...data, send_default_message: data.description === originalMessage })
            .then((response) => {
                setData({ ...data, description: originalMessage, send_to_customer: false });
                toast.success("Uspešno!");
            })
            .catch((error) => {
                toast.warn("Greška");
                console.warn(error);
            });
    };

    return (
        <Box>
            <InputSelect
                label="Status porudžbine"
                required={true}
                name="status"
                value={data.status ?? ""}
                onChange={({ target }) => {
                    setData({ ...data, [target.name]: target.value });
                }}
                fillFromApi={`${apiPath}/ddl`}
                usePropName={true}
                options={[]}
            />
            <InputCheckbox
                label="Pošalji poruku kupcu"
                name="send_to_customer"
                value={data.send_to_customer ?? false}
                onChange={({ target }) => {
                    setData({ ...data, [target.name]: target.checked });
                }}
            />
            {data.send_to_customer && (
                <InputText
                    label="Poruka"
                    name="description"
                    value={data.description ?? false}
                    onChange={({ target }) => {
                        setData({ ...data, [target.name]: target.value });
                    }}
                />
            )}
            <Buttons>
                <Button label="Istorija" onClick={() => setOpenDialog({ show: true })} />
                <Button label="Sačuvaj" variant="contained" onClick={formSubmitHandler} />
            </Buttons>
            <HistoryModal openDialog={openDialog} setOpenDialog={setOpenDialog} apiPath={`${apiPath}/${orderId}`} />
        </Box>
    );
};

export default OrderStatus;
