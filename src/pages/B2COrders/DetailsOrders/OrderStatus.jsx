import { useContext, useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import Button from "../../../components/shared/Button/Button";
import Buttons from "../../../components/shared/Form/Buttons/Buttons";
import { InputCheckbox, InputHtml, InputSelect } from "../../../components/shared/Form/FormInputs/FormInputs";
import HistoryModal from "./HistoryModal";
import AuthContext from "../../../store/auth-contex";
import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import customToast from "../../../utils/toastUtils";

const OrderStatus = ({ orderId, status, orderRefetch }) => {
    const authCtx = useContext(AuthContext);
    const { api } = authCtx;
    const apiPath = "admin/orders-b2c/status";

    const [data, setData] = useState({
        id_order: orderId,
        status,
        send_mail: null,
        mail_to_customer: null,
        mail_to_admin: null,
        subject: null,
        content: null,
        send_to_customer: false,
    });

    const [originalMessage, setOriginalMessage] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    // Dobijanje poruke za status
    const getMessage = useCallback(
        async (statusCode) => {
            try {
                const response = await api.get(`${apiPath}/message/${orderId}/${statusCode}`);
                const newData = response?.payload || {};
                setOriginalMessage(newData.content || "");
                setData((prev) => ({
                    ...prev,
                    ...newData,
                    send_to_customer: newData.send_mail === "1",
                }));
            } catch (error) {
                customToast.error(error.message);
                setTimeout(() => navigate("/b2c-orders"), 3000);
            }
        },
        [api, orderId]
    );

    useEffect(() => {
        if (status !== data.status) {
            getMessage(data.status);
        } else {
            setOriginalMessage("");
        }
    }, [data.status, getMessage]);

    // Dobijanje svih mogućih statusa
    const { data: allStatuses } = useQuery(
        [`${apiPath}/ddl/status`, orderId],
        async () => {
            const res = await api.get("admin/orders-b2c/status/ddl/status");
            return res?.payload || [];
        },
        { refetchOnWindowFocus: false }
    );

    // Dobijanje dostupnih statusa na osnovu odabranog
    const { data: availableStatuses } = useQuery(
        [`${apiPath}/ddl/status_flow`, data?.status],
        async () => {
            const res = await api.get(`admin/orders-b2c/status/ddl/status_flow/${data?.status}`);
            return res?.payload || [];
        },
        { refetchOnWindowFocus: false, enabled: !!data?.status }
    );

    // Kreiranje liste opcija
    const options =
        availableStatuses && allStatuses
            ? (() => {
                  const selectedStatus = allStatuses.find((s) => s.id === data?.status);
                  return availableStatuses.some((s) => s.id === data?.status) ? availableStatuses : [selectedStatus, ...availableStatuses];
              })()
            : [];

    // Slanje podataka
    const formSubmitHandler = async () => {
        setLoading(true);
        try {
            const payload = data.send_to_customer
                ? { ...data, send_default_message: data.content === originalMessage }
                : { ...data, send_default_message: null, mail_to_customer: null, content: null, subject: null };

            await api.post(apiPath, payload);
            customToast.success("Uspešno!");
            orderRefetch();
            setOriginalMessage(data.content);
        } catch (error) {
            customToast.warning(error?.response?.data?.message ?? error?.message ?? "Greska");
            console.warn(error);
        }
        setLoading(false);
    };

    return (
        <Box>
            {loading ? (
                <CircularProgress size="1.5rem" />
            ) : (
                <InputSelect
                    label="Status porudžbine"
                    required
                    name="status"
                    value={data.status || ""}
                    onChange={({ target }) => setData({ ...data, status: target.value })}
                    options={options}
                    styleFormControl={{ ".MuiFormLabel-root": { fontSize: "0.875rem" }, "&.MuiFormControl-root": { marginTop: "0" } }}
                />
            )}

            {data.send_mail === "1" && status !== data.status && (
                <>
                    <InputCheckbox
                        label="Pošalji poruku kupcu"
                        name="send_to_customer"
                        value={data.send_to_customer || false}
                        onChange={({ target }) => setData({ ...data, send_to_customer: target.checked })}
                    />
                    {data.send_to_customer && <InputHtml label="Poruka" name="content" value={data.content || ""} onChange={({ target }) => setData({ ...data, content: target.value })} />}
                </>
            )}

            <Buttons>
                <Button label="Istorija" onClick={() => setOpenDialog(true)} sx={{ "@media (max-width: 500px)": { minWidth: "fit-content", padding: "0.2rem 0.5rem" } }} />
                <Button
                    label="Sačuvaj"
                    variant="contained"
                    onClick={formSubmitHandler}
                    disabled={loading || status === data.status}
                    sx={{ "@media (max-width: 500px)": { minWidth: "fit-content", padding: "0.2rem 0.5rem" } }}
                />
            </Buttons>

            <HistoryModal openDialog={openDialog} setOpenDialog={setOpenDialog} apiPath={`${apiPath}/${orderId}`} />
        </Box>
    );
};

export default OrderStatus;
