import { Box } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import CreateForm from "../../../components/shared/Form/CreateForm";
import Button from "../../../components/shared/Button/Button";
import PageWrapper from "../../../components/shared/Layout/PageWrapper/PageWrapper";

import fields from "./formField.json";
import { getTown } from "../services";
import AuthContext from "../../../store/auth-contex";
import requirePropFactory from "@mui/utils/requirePropFactory";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import Form from "../../../components/shared/Form/Form";
import LoadingForm from "../../../components/shared/Loading/LoadingForm";
import useAPI from "../../../api/api";

const init = {
  slug: "",
  name: "",
  phone_code: "",
  source: "",
  id_source: 0,
};
const TownsDetails = () => {
  const { id } = useParams();
  const api = useAPI();
  const navigate = useNavigate();
  const [data, setData] = useState(init);
  const [isLoading, setIsLoading] = useState(false);

  const handleData = async () => {
    setIsLoading(true);
    api
      .get(`admin/towns/${id}`)
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
    const repack = { ...data, id: id === "new" ? null : Number(id) };
    api
      .post(`admin/towns`, repack)
      .then((response) => {
        setData(response?.payload);
        toast.success(
          `Uspešno ${id === "new" ? "dodati" : "izmenjeni"} podaci`
        );
      })
      .catch((error) => {
        console.warn(error);
        toast.warning("Greška");
      })
      .then(() => {
        if (id === "new") {
          navigate(-1);
        }
      });
  };

  useEffect(() => {
    if (id !== "new") {
      handleData();
    }
  }, []);

  return (
    <PageWrapper title="Detalji mesta" back={() => navigate(-1)}>
      {!isLoading ? (
        <Form formFields={fields} initialData={data} onSubmit={saveData} />
      ) : (
        <LoadingForm fields={fields.length} />
      )}
    </PageWrapper>
  );
};

export default TownsDetails;
