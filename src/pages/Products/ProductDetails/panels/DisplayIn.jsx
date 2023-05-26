import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import Form from "../../../../components/shared/Form/Form";

import formFields from "../forms/display_in.json";

const DisplayIn = ({ productId }) => {
  const init = {
    display_in_section_super_action: null,
    display_in_section_top_sellers: null,
    display_in_section_best_sell: null,
    display_in_section_new_arrival: null,
    display_in_section_action: null,
    display_in_section_sale: null,
    display_in_section_recommendation: null,
    display_in_section_position: null,
    b2b_display_in_section_recommendation: null,
  };
  const [data, setData] = useState(init);
  const api = useAPI();
  const apiPath = "admin/product-items/display-in-section";

  const handleData = () => {
    api.get(`${apiPath}/${productId}`)
      .then((response) => {
        setData(response?.payload);
      })
      .catch((error) => console.warn(error));
  };

  const handleSubmit = (data) => {
    api.post(`${apiPath}`, data)
      .then((response) => {
        setData(response?.payload);
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

export default DisplayIn;
