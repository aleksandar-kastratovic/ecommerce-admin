import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import FormWrapper from "../../../components/shared/Layout/FormWrapper/FormWrapper";
import Form from "../../../components/shared/Form/Form";
import LoadingForm from "../../../components/shared/Loading/LoadingForm";
import useAPI from "../../../api/api";

import formFields from "./formField.json";

const CountriesDetails = () => {
    const { mid } = useParams();
    const navigate = useNavigate();
    const api = useAPI();

    const init = {
        id: null,
        slug: null,
        name: null,
        id_country: null,
        phone_code: null,
        source: null,
        id_source: null,
        status: null,
    };

    const [data, setData] = useState(init);
    const [isLoading, setIsLoading] = useState(false);

    const handleData = async () => {
        setIsLoading(true);
        await api
            .get(`admin/municipalities/${mid}`)
            .then((response) => {
                setData(response?.payload);
            })
            .catch((error) => {
                console.warn(error);
            });
        setIsLoading(false);
    };

    const submitHandler = (data) => {
        let oldId = data.id;
        api.post("admin/municipalities", data)
            .then((response) => {
                toast.success("Uspešno");
                setData(response?.payload);

                if (oldId === null) {
                    let tId = response?.payload?.id;
                    navigate(`/municipalities/${tId}`, { replace: true });
                }
            })
            .catch((error) => {
                toast.warning("Greška");
                console.warn(error);
            });
    };

    useEffect(() => {
        handleData();
    }, []);

    return (
        <FormWrapper
            title={mid === "new" ? "Unos nove opštine" : data?.name}
            back={() => {
                navigate(-1);
            }}
        >
            {!isLoading ? <Form formFields={formFields} initialData={data} onSubmit={submitHandler} /> : <LoadingForm fields={formFields.length} />}
        </FormWrapper>
    );
};

export default CountriesDetails;
