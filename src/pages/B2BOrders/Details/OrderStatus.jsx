import { Box } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../api/api";
import Button from "../../../components/shared/Button/Button";
import Buttons from "../../../components/shared/Form/Buttons/Buttons";
import { InputCheckbox, InputHtml, InputSelect, InputText } from "../../../components/shared/Form/FormInputs/FormInputs";
import HistoryModal from "./HistoryModal";

const OrderStatus = ({ orderId, status }) => {
    const api = useAPI();
    const apiPath = "admin/orders-b2b/status";

    const init = { id_order: orderId, status, send_mail: null, mail_to_customer: null, mail_to_admin: null, subject: null, content: null };

    const [data, setData] = useState(init);
    const [originalMessage, setOriginalMessage] = useState(data.message);
    const [openDialog, setOpenDialog] = useState({ show: false });
    const [sendMail, setSendMail] = useState("0");

    const [loaded, setLoaded] = useState(false);

    const getMessage = (statusCode) => {
        api.get(`${apiPath}/message/${orderId}/${statusCode}`)
            .then((response) => {
                setOriginalMessage(response?.payload.content);
                setSendMail(response?.payload.send_mail);
                setData({ ...data, ...response?.payload });
            })
            .catch((error) => console.warn(error));
    };

    useEffect(() => {
        getMessage(data.status);
    }, [data.status]);

    const formSubmitHandler = () => {
        let ret = {};
        if (data.send_to_customer) {
            ret = { ...data, send_default_message: data.content === originalMessage };
        } else {
            ret = { ...data, send_default_message: null, mail_to_customer: null, mail_to_customers: null, content: null, subject: null };
        }
        api.post(apiPath, ret)
            .then((response) => {
                setData({ ...data, content: originalMessage, send_to_customer: false });
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
            {sendMail === "1" && (
                <>
                    <InputCheckbox
                        label="Pošalji poruku kupcu"
                        name="send_to_customer"
                        value={data.send_to_customer ?? false}
                        onChange={({ target }) => {
                            setData({ ...data, [target.name]: target.checked });
                        }}
                    />
                    {data.send_to_customer && (
                        <InputHtml
                            label="Poruka"
                            name="content"
                            value={data.content ?? false}
                            onChange={({ target }) => {
                                if (!loaded) {
                                    setOriginalMessage(target.value);
                                    setLoaded(true);
                                }
                                setData({ ...data, [target.name]: target.value });
                            }}
                        />
                    )}
                </>
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
