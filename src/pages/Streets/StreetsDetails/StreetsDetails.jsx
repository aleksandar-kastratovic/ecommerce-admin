import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CreateForm from "../../../components/shared/Form/CreateForm";
import PageWrapper from "../../../components/shared/Layout/PageWrapper/PageWrapper";
import { formatDate } from "../../../helpers/dateFormat";

import fields from './formField.json';

const StreetsDetails = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate("/streets");
    }
    const [data, setData] = useState([]);
    const [inputsError, setInputsError] = useState([]);

    const formItemChangeHandler = ({ target }, type) => {
        if(type==="date") {
          setData({ ...data, [target.name]: formatDate(target.value ) });
        }
        else if (type) {
          setData({ ...data, [target.name]: target.checked });
        } else {
          setData({ ...data, [target.name]: target.value });
        }
      };

    return(
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
          </Box>
       </PageWrapper>
    )
};

export default StreetsDetails;