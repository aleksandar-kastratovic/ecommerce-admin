import { Box } from "@mui/system";
import { isEmpty } from "lodash";
import { useCallback, useEffect, useState } from "react";
import Button from "../Button/Button";
import CreateForm from "./CreateForm";
import Buttons from "./Buttons/Buttons";
import { useNavigate } from "react-router-dom";
import { formatDate, formatDateTime } from "../../../helpers/dateFormat";
import ImageDialog from "../Dialogs/ImageDialog";
import { repackToSend, isUrlValid } from "./util";

const Form = ({
  formFields = [],
  initialData = {},
  onSubmit = () => {},
  cancelButton = true,
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState(initialData);
  const [inputsError, setInputsError] = useState([]);
  const [openImageDialog, setOpenImageDialog] = useState({
    show: false,
    image: null,
    label: "",
    width: 300,
    height: 200,
    name: "",
  });

  const submitHandler = () => {
    const errors = {};
    for (const field of formFields) {
      if (
        (data[field.prop_name] === "" || data[field.prop_name] === null) &&
        field.required
      ) {
        errors[field.prop_name] = {
          content: "Polje je obavezno, molim Vas unesite vrednost.",
        };
      }
    }
    isEmpty(errors) ? onSubmit(data) : setInputsError(errors);
  };

  const formItemChangeHandler = ({ target }, type) => {
    if (type === "date") {
      setData({ ...data, [target.name]: formatDate(target.value) });
    } else if (type === "date_time") {
      setData({ ...data, [target.name]: formatDateTime(target.value) });
    } else if (type === "swicth" || type === "checkbox") {
      setData({ ...data, [target.name]: target.checked });
    } else {
      setData({ ...data, [target.name]: target.value });
    }
  };

  const formImageUpload = useCallback(
    (event) => {
      event.preventDefault();
      const selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        const timeOutId = setTimeout(() => {
          setter(event, reader.result);
        }, 500);
        return () => clearTimeout(timeOutId);
      };
      reader.readAsDataURL(selectedFile);
    },
    [data]
  );

  const onOpenImageDialog = (img, label, imageName, width, height) => {
    const found = data[imageName];
    const checkImage = isUrlValid(img);

    if (checkImage) {
      setOpenImageDialog({
        show: true,
        image: found,
        label: label,
        width: width,
        height: height,
        name: imageName,
        showDimensions: false,
      });
    } else {
      setOpenImageDialog({
        show: true,
        image: img,
        label: label,
        width: width,
        height: height,
        name: imageName,
        showDimensions: false,
      });
    }
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog({ show: false, image: null, label: "", name: "" });
  };

  const handleSaveEditImage = (imageName, image) => {
    setData({ ...data, [imageName]: image });
  };

  const handleDeleteImage = (imageName) => {
    setData({ ...data, [imageName]: null });
  };

  const setter = (event, result) => {
    setData({ ...data, [event.target.name]: result });
  };

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return (
    <>
      <Box component="form" autoComplete="off">
        {formFields &&
          formFields
            .filter(({ in_details }) => in_details)
            .map((item, index) => {
              return (
                <CreateForm
                  data-test-id="admin-form"
                  onChangeHandler={formItemChangeHandler}
                  onImageUpload={formImageUpload}
                  onOpenImageDialog={onOpenImageDialog}
                  item={item}
                  key={index}
                  error={
                    inputsError[item.prop_name]
                      ? inputsError[item.prop_name].content
                      : ""
                  }
                  value={
                    Array.isArray(item) && data
                      ? data[item.prop_name]
                      : data[item.prop_name]
                  }
                />
              );
            })}
        <Buttons>
          {cancelButton && (
            <Button label="Odustani" onClick={() => navigate(-1)} />
          )}
          <Button label="Sačuvaj" onClick={submitHandler} variant="contained" />
        </Buttons>
      </Box>
      <ImageDialog
        title="Obrada slike"
        openImageDialog={openImageDialog}
        handleCloseImageDialog={handleCloseImageDialog}
        onImageUpload={formImageUpload}
        handleSaveEditImage={handleSaveEditImage}
        handleDeleteImage={handleDeleteImage}
      />
    </>
  );
};

export default Form;
