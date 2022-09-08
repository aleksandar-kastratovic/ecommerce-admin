import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormWrapper from "../../../components/shared/Layout/FormWrapper/FormWrapper";
import useAPI from "../../../api/api";
import LoadingForm from "../../../components/shared/Loading/LoadingForm";
import Form from "../../../components/shared/Form/Form";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import CreateForm from "../../../components/shared/Form/CreateForm";

import name from "../forms/name.json";
import positionForm from "../forms/position.json";
import image from "../forms/image.json";
import image_description from "../forms/image_description.json";
import status from "../forms/status.json";

const DetailsBanners = ({}) => {
    const { B2BId } = useParams();
    const navigate = useNavigate();

    const init = {
        active_from: null,
        active_to: null,
        button: null,
        download: null,
        duration: null,
        image: null,
        is_active: true,
        name: null,
        id_position: null,
        priority: null,
        subtitle: null,
        target: null,
        text: null,
        title: null,
        url: null,
        video: null,
    };

    const api = useAPI();
    const [data, setData] = useState(init);
    const [subFields, setSubFields] = useState([]);

    const { data: response, isLoading } = useQuery([], () => api.get(`admin/banners-b2b/main/${B2BId}`));

    const saveData = (data) => {
        api.post(`admin/banners-b2b/main/`, data)
            .then((response) => {
                setData(response?.payload);
                toast.success(`Uspešno`);
            })
            .catch((error) => {
                console.warn(error);
                toast.warning("Greška");
            });
    };

    useEffect(() => {
        setData(response?.payload);
    }, [response]);

    useEffect(() => {
        const getForm = async () => {
            let res;
            await api
                .get(`admin/banners-b2b/positions/slug/${data.id_position}`)
                .then((response) => {
                    res = response?.payload;
                })
                .catch((error) => {
                    console.warn(error);
                });
            if (res) {
                let dimensions = { width: res.width, height: res.height };
                let fields;

                switch (res.type) {
                    case "image":
                        fields = image;
                        break;
                    case "image_description":
                        fields = image_description;
                        break;

                    default:
                        fields = [];
                        break;
                }

                let arr = [];
                for (const item of fields) {
                    if (item.prop_name === "image") {
                        arr.push({ ...item, dimensions: dimensions });
                    } else {
                        arr.push(item);
                    }
                }
                setSubFields(arr);
            }
        };
        if (data && data.id_position !== null) {
            getForm();
        }
    }, [data]);

    return (
        <FormWrapper title={B2BId == "new" ? "Unos novog banera" : data?.name} back={() => navigate(-1)}>
            {!isLoading ? (
                <>
                    <CreateForm onChangeHandler={({ target }) => setData({ ...data, name: target.value })} item={name} value={data ? data.name : ""} />
                    <CreateForm onChangeHandler={({ target }) => setData({ ...data, id_position: target.value })} item={positionForm} value={data ? data.id_position : ""} />
                    <Form formFields={[...subFields, status]} initialData={data} onSubmit={saveData} />
                </>
            ) : (
                <LoadingForm fields={5} />
            )}
        </FormWrapper>
    );
};

export default DetailsBanners;
