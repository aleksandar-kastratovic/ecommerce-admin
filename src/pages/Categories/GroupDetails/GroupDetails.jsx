import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Form from "../../../components/shared/Form/Form";
import useAPI from "../../../api/api";
import FormWrapper from "../../../components/shared/Layout/FormWrapper/FormWrapper";

import fields from "./formFields.json";

const GroupDetails = () => {
    const { gid } = useParams();
    const api = useAPI();
    const init = {
        id: null,
        slug: null,
        name: null,
        display_name: null,
        zip_code: null,
        id_municipality: null,
        id_country: null,
        delivery_center: null,
        delivery_days: null,
        source: null,
        id_source: null,
        status: null,
    };
    const navigate = useNavigate();
    const [data, setData] = useState(init);
    const [isLoading, setIsLoading] = useState(false);
    const apiPath = "admin/category-product/groups";

    const handleData = async () => {
        setIsLoading(true);
        await api
            .get(`${apiPath}/${gid}`)
            .then((response) => {
                setData(response?.payload);
                setIsLoading(false);
            })
            .catch((error) => {
                console.warn(error);
                setIsLoading(false);
            });
    };

    const saveData = async (data) => {
      let oldId = data.id;
        api.post(apiPath, data)
            .then((response) => {
                setData(response?.payload);
                toast.success(`Uspešno`);

                if (oldId === null) {
                  let tId = response?.payload?.id;
                  navigate(`/product-categories/${tId}`, { replace: true });
              }
            })
            .catch((error) => {
                console.warn(error);
                toast.warning("Greška");
            });
    };

    useEffect(() => {
        handleData();
    }, []);

    return (
        <FormWrapper title={data?.id == null ? "Unos nove grupe" : data?.name} back={() => navigate(-1)} ready={!isLoading}>
            <Form formFields={fields} initialData={data} onSubmit={saveData} />
        </FormWrapper>
    );
};

export default GroupDetails;
