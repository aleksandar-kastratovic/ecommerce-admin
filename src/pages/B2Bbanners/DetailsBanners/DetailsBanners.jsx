import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageWrapper from "../../../components/shared/Layout/PageWrapper/PageWrapper";
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
    position: null,
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
  const [positionField, setPositionField] = useState(positionForm);
  const [subFields, setSubFields] = useState([]);

  const {
    isSuccess,
    data: response,
    isLoading,
    isError,
  } = useQuery([], () => api.get(`admin/banners-b2b/main/${B2BId}`));

  const saveData = async (data) => {
    api
      .post(`admin/banners-b2b/main/`, data)
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
    switch (data.position) {
      case "image":
        setSubFields(image);
        break;
      case "image_description":
        setSubFields(image_description);
        break;

      default:
        setSubFields([]);
        break;
    }
  }, [data.position]);

  useEffect(() => {
    const fillDDl = async () => {
      await api
        .get(`admin/banners-b2b/main/ddl/position`)
        .then((response) => {
          setPositionField({ ...positionField, options: response.payload });
        })
        .catch((error) => {
          console.warn(error);
        });
    };

    //fillDDl();
  }, []);

  return (
    <PageWrapper title="Unos novog banera" back={() => navigate(-1)}>
      {!isLoading ? (
        <>
          <CreateForm
            onChangeHandler={({ target }) =>
              setData({ ...data, name: target.value })
            }
            item={name}
            value={data ? data.name : ""}
          />
          <CreateForm
            onChangeHandler={({ target }) =>
              setData({ ...data, position: target.value })
            }
            item={positionField}
            value={data ? data.position : ""}
          />
          <Form formFields={subFields} initialData={data} onSubmit={saveData} />
        </>
      ) : (
        <LoadingForm fields={5} />
      )}
    </PageWrapper>
  );
};

export default DetailsBanners;
