import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageWrapper from "../../../components/shared/Layout/PageWrapper/PageWrapper";
import useAPI from "../../../api/api";
import LoadingForm from "../../../components/shared/Loading/LoadingForm";
import Form from "../../../components/shared/Form/Form";

import fields from "./fieldsDetails.json";

const DetailsBanners = ({}) => {
  const { B2BId } = useParams();
  const navigate = useNavigate();

  const init = {
    active_from: null,
    active_to: null,
    button: "",
    download: null,
    duration: 0,
    image: null,
    is_active: true,
    name: "",
    position: "primary",
    priority: 0,
    subtitle: "",
    target: "blank",
    text: "",
    title: "",
    url: null,
    video: null,
  };

  const api = useAPI();
  const [data, setData] = useState(init);
  const [isLoading, setIsLoading] = useState(false);

  const handleData = async () => {
    setIsLoading(true);
    api
      .get(`admin/towns/${B2BId}`)
      .then((response) => {
        setData(response?.payload);
      })
      .catch((error) => {
        console.warn(error);
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  const saveData = async (data) => {
    const repack = { ...data, id: B2BId === "new" ? null : Number(B2BId) };
    api
      .post(`admin/towns`, repack)
      .then((response) => {
        setData(response?.payload);
        toast.success(
          `Uspešno ${B2BId === "new" ? "dodati" : "izmenjeni"} podaci`
        );
      })
      .catch((error) => {
        console.warn(error);
        toast.warning("Greška");
      });
  };

  useEffect(() => {
    if (B2BId !== "new") {
      handleData();
    }
  }, []);

  return (
    <PageWrapper title="Unos novog banera" back={() => navigate(-1)}>
      {!isLoading ? (
        <Form formFields={fields} initialData={data} onSubmit={saveData} />
      ) : (
        <LoadingForm fields={fields.length} />
      )}
    </PageWrapper>
  );
};

export default DetailsBanners;
