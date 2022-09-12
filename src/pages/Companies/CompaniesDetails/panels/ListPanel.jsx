import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import List from "../../../../components/shared/ListAdder/List";
import formFields from "../forms/delivery_address.json";

const ListPanel = ({ companyId, formFields, apiPath, init = {} }) => {
    const [data, setData] = useState(init);
    const api = useAPI();

    const handleData = () => {
        api.list(`${apiPath}/${companyId}`)
            .then((response) => setData(response?.payload))
            .catch((error) => console.warn(error));
    };

    const saveData = (data) => {
        api.post(`${apiPath}/${companyId}`, data)
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
        api.delete(`${apiPath}/${id}`)
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

export default ListPanel;
