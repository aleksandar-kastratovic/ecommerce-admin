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
    const [bannerName, setBannerName] = useState(null);
    const [idPos, setIdPos] = useState(null);

    const [subFields, setSubFields] = useState([]);

    const { data: response, isLoading } = useQuery([], () => api.get(`admin/banners-b2b/main/${B2BId}`));

    const saveData = (data) => {
        let oldId = data.id;
        api.post(`admin/banners-b2b/main/`, { ...data, id_position: idPos, name: bannerName })
            .then((response) => {
                setData(response?.payload);
                setBannerName(response?.payload.name);
                setIdPos(response?.payload.id_position);
                toast.success(`Uspešno`);
                if (oldId === null) {
                  let tId = response?.payload?.id;
                  navigate(`/b2b-banners/${tId}`, { replace: true });
              }
            })
            .catch((error) => {
                console.warn(error);
                toast.warning("Greška");
            });
    };

    useEffect(() => {
        setData(response?.payload);
        setBannerName(response?.payload.name);
        setIdPos(response?.payload.id_position);
    }, [response]);

    useEffect(() => {
        const getForm = async () => {
            let res;
            await api
                .get(`admin/banners-b2b/positions/slug/${idPos}`)
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
        if (idPos != null) {
            getForm();
        }
    }, [idPos]);

    return (
        <FormWrapper title={data?.id == null ? "Unos novog banera" : data?.name} back={() => navigate(-1)} ready={!isLoading}>
            <CreateForm onChangeHandler={({ target }) => setBannerName(target.value)} item={name} value={bannerName} />
            <CreateForm onChangeHandler={({ target }) => setIdPos(target.value)} item={positionForm} value={idPos} />
            <Form formFields={[...subFields, status]} initialData={data} onSubmit={saveData} onChange={(data) => setData(data)} />
        </FormWrapper>
    );
};

export default DetailsBanners;
