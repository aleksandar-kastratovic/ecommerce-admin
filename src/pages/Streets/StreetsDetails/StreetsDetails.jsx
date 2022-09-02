import { Box } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import CreateForm from "../../../components/shared/Form/CreateForm";
import Button from "../../../components/shared/Button/Button";
import PageWrapper from "../../../components/shared/Layout/PageWrapper/PageWrapper";
import { formatDate } from "../../../helpers/dateFormat";

import fields from "./formField.json";
import { getStreet, saveStreet } from "../services";
import AuthContext from "../../../store/auth-contex";
import requirePropFactory from "@mui/utils/requirePropFactory";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";

const required = [];
const init = {
  slug: "",
  name: "",
  display_name: "",
  source: "",
  "id_town ": "",
  id_municipality: "",
  "id_country ": "",
  source: "",
  id_source: "",
};
const StreetsDetails = () => {
  const { sid } = useParams();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/streets");
  };
  const [data, setData] = useState(init);
  const [inputsError, setInputsError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const formItemChangeHandler = ({ target }, type) => {
    if (type === "date") {
      setData({ ...data, [target.name]: formatDate(target.value) });
    } else if (type) {
      setData({ ...data, [target.name]: target.checked });
    } else {
      setData({ ...data, [target.name]: target.value });
    }
  };

  const handleData = async () => {
    try {
      setIsLoading(true);
      let response = await getStreet(user.access_token, sid);
      let { payload } = response.data;
      setData(payload);
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveData = async () => {
    try {
      let response = await saveStreet(user.access_token, data);
      handleBack();
      toast.success("Uspešno uneta forma!");
    } catch (error) {
      console.warn(error.response);
      toast.warning("Greška ");
    }
  };

  const onSubmit = () => {
    const errors = {};
    Object.keys(data).forEach((prop_name) => {
      if (isEmpty(data[prop_name])) {
        if (required.includes(prop_name))
          errors[prop_name] = {
            content: "Polje je obavezno, molim Vas unesite vrednost.",
          };
      }
    });
    isEmpty(errors) ? saveData() : setInputsError(errors);
  };

  useEffect(() => {
    if (sid !== "new") {
      handleData();
    }
  }, []);

  return (
    <PageWrapper title="Detalji ulice" back={handleBack}>
      <Box component="form" autoComplete="off">
        {fields &&
          fields
            .filter(({ in_details }) => in_details)
            .map((item, index) => {
              return (
                <CreateForm
                  data-test-id="admin-form"
                  onChangeHandler={formItemChangeHandler}
                  item={item}
                  key={index}
                  error={inputsError[item.prop_name]}
                  value={
                    Array.isArray(item) && data
                      ? data[item.prop_name]
                      : data[item.prop_name]
                  }
                />
              );
            })}
        <Button label="Sačuvaj" onClick={onSubmit} />
      </Box>
    </PageWrapper>
  );
};

export default StreetsDetails;
