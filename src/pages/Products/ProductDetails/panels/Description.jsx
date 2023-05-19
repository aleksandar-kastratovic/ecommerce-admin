import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import Form from "../../../../components/shared/Form/Form";

import formFields from "../forms/description.json";

const Description = ({ productId }) => {
  const init = {
    id: productId,
    short_description: null,
    description: null,
    id_manufacture: null,
    id_brand: null,
    stickers: null,
  };
  const [data, setData] = useState(init);
  const api = useAPI();
  const apiPath = "admin/product-items/description";

  const handleData = () => {
    api.get(`${apiPath}/${productId}`)
      .then((response) => {
        let stickers = [];
        if (response?.payload.stickers) stickers = JSON.parse(response?.payload?.stickers);
        let res = { ...response?.payload, stickers: stickers };
        setData(res);
      })
      .catch((error) => console.warn(error));
  };

  const handleSubmit = (data) => {
    let req = {
      ...data,
      stickers: JSON.stringify(data.stickers),
    };

    api.post(`${apiPath}`, req)
      .then((response) => {
        let stickers = [];
        if (response?.payload.stickers) stickers = JSON.parse(response?.payload?.stickers);
        let res = { ...response?.payload, stickers: stickers };
        setData(res);
        toast.success("Uspešno");
      })
      .catch((error) => {
        toast.warn("Greška");
        console.warn(error);
      });
  };

  useEffect(() => {
    handleData();
  }, []);

  return <Form formFields={formFields} initialData={data} onSubmit={handleSubmit} />;
};

export default Description;
