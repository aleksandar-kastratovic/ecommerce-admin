import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import List from "../../../../components/shared/ListAdder/List";

const UsersPanel = ({ companyId, formFields, apiPath, init = {} }) => {
    const [data, setData] = useState([]);
    const api = useAPI();

    const handleData = () => {
        api.list(`${apiPath}/${companyId}`)
            .then((response) => setData(response?.payload?.items ?? []))
            .catch((error) => console.warn(error));
    };

    const saveData = (data) => {
        api.post(`${apiPath}`, { ...data, id_company: companyId })
            .then((response) => {
                handleData();
                toast.success("Uspešno");
            })
            .catch((error) => {
                console.warn(error);
                toast.warn("Greška");
            });
    };

    const deleteHandler = (token, id) => {
        api.delete(`${apiPath}/${companyId}/${id}`)
            .then((response) => {
                handleData();
                toast.success("Uspešno");
            })
            .catch((error) => {
                console.warn(error);
                toast.warn("Greška");
            });
    };

    useEffect(() => {
        handleData();
    }, []);
    return <List formFields={formFields} listFields={data} init={init} onSave={saveData} onDelete={deleteHandler} />;
};

export default UsersPanel;
