import { useNavigate, useParams } from "react-router-dom";
import PageWrapper from "../../../components/shared/Layout/PageWrapper/PageWrapper";
import Form from "../../../components/shared/Form/Form";

import formFields from "./formFields.json";
import useAPI from "../../../api/api";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import LoadingForm from "../../../components/shared/Loading/LoadingForm";

const B2BPositionDetails = () => {
  const init = {
    id: null,
    slug: null,
    name: null,
    type: null,
    width: null,
    height: null,
    order: 0,
    status: "on",
  };

  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(init);
  const [fields, setFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const api = useAPI();

  const submitHandler = (data) => {
    api
      .post("admin/banners-b2b/positions/", { ...init, ...data })
      .then((response) => {
        toast.success("Uspešno");
        setData(response?.payload);
      })
      .catch((error) => {
        toast.warning("Greška");
        console.warn(error);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    const getFields = async () => {
      let arr = [];
      for (const item of formFields) {
        if (item.input_type === "select" && item.prop_name !== "status") {
          await api
            .get(`admin/banners-b2b/positions/ddl/${item.prop_name}`)
            .then((response) => {
              let newItem = { ...item, options: response?.payload };
              arr.push(newItem);
            })
            .catch((error) => {
              console.warn(error);
            });
        } else {
          arr.push(item);
        }
      }

      setFields(arr);
    };

    api
      .get(`admin/banners-b2b/positions/${id}`)
      .then((response) => {
        setData(response?.payload);
      })
      .catch((error) => {
        console.warn(error);
      });

    getFields();
    setIsLoading(false);
  }, []);

  return (
    <PageWrapper
      title={id == "new" ? "Detalji pozicije" : data?.name}
      back={() => {
        navigate(-1);
      }}
    >
      {!isLoading ? (
        <Form formFields={fields} initialData={data} onSubmit={submitHandler} />
      ) : (
        <LoadingForm fields={formFields.length} />
      )}
    </PageWrapper>
  );
};

export default B2BPositionDetails;
