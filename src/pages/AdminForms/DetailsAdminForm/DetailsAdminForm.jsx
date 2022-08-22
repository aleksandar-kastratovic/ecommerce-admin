import { Box } from "@mui/material";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DetailsBasic from "../../../components/shared/Layout/Details/DetailsBasic/DetailsBasic";
import AuthContext from "../../../store/auth-contex";
import { getFormData, getListFormFields } from "../services";

import styles from "./DetailsAdminForm.module.scss";
import DetailsList from "./DetailsList";

import listData from "./DetailsListData.json";
import fields from "./DetailsFields.json";
import CreateForm from "../../../components/shared/Form/CreateForm";

const DetailsAdminForm = () => {
  const { FormId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selected, setSelected] = useState("info");
  const [detailsList, setDetailsList] = useState(listData);
  const [data, setData] = useState([]);
  const [formFields, setFormFields] = useState([]);

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
    priority: 76,
    subtitle: "",
    target: "blank",
    text: "",
    title: "AI",
    url: null,
    video: null,
  };

  const newItem = init;

  const handleBackToList = () => {
    navigate(`/admin-form`);
  };

  const handleSelectInDetails = (module, slug) => {
    console.log(module);
    if (FormId !== "new") {
      setSelected(slug);
    }
  };

  const handleFormData = async () => {
    try {
      let response = await getFormData(user.access_token, FormId);
      let { payload } = response.data;
      setData(payload);
    } catch (error) {
      console.warn(error);
    }
  };

  const handleFormFields = async () => {
    try {
      let response = await getListFormFields(user.access_token, FormId);
      let { payload } = response.data;
      setFormFields(payload.items);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    if (FormId !== "new") {
      handleFormData();
      handleFormFields();
    }
  }, []);

  console.log(data);
  console.log(formFields);
  return (
    <>
      <Box className={styles.details}>
        <DetailsBasic
          handleBackToList={handleBackToList}
          list={
            <DetailsList
              selected={selected}
              detailsList={detailsList}
              handleSelectInDetails={handleSelectInDetails}
              isLoadingList={false}
              isErrorList={false}
            />
          }
          main={
            <div>
              <Box component="form" autoComplete="off">
                {fields &&
                  fields
                    .filter(({ in_details }) => in_details)
                    .map((item, index) => (
                      <CreateForm
                        data-test-id="B2B-banners-form"
                        onChangeHandler={() => {}}
                        onImageUpload={() => {}}
                        onImagePreview={() => {}}
                        item={item}
                        key={index}
                        error={""}
                        value={
                          Array.isArray(item) && newItem
                            ? newItem[item.prop_name]
                            : newItem[item.prop_name]
                        }
                      />
                    ))}
              </Box>
            </div>
          }
        />
      </Box>
    </>
  );
};

export default DetailsAdminForm;
