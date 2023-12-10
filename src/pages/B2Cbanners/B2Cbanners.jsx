import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";
import AuthContext from "../../store/auth-contex";

const B2Cbanners = ({ }) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const { api } = authCtx;
  const [formFieldsTemp, setFormFieldsTemp] = useState(tblFields);
  const [idPosition, setIdPosition] = useState(null);

  const buttons = [
    {
      label: "Pozicije",
      action: () => {
        navigate("positions");
      },
    },
  ];



  const customActions = {
    edit: {
      clickHandler: {
        type: 'modal_form',
        fnc: (rowData) => {
          setIdPosition(rowData?.id_position);
          filterFields(formFieldsTemp, rowData?.position_type);
          getForm();
          return {
            show: true,
            id: rowData.id
          };
        },
      },
    },
  }

  const handleInformationImage = () => {
    api.get(`admin/product-items/gallery/options/upload?id_position=${idPosition}`)
      .then((response) => {
        formatFormFields(response?.payload);
      })
      .catch((error) => console.warn(error));
  };

  const filterFields = (fields, type) => {
    let arr = [];
    if (type === "gallery") {
      arr = fields?.map((item, i) => {
        const { prop_name } = item;
        if (prop_name === 'position_name' || prop_name === 'title' || prop_name === 'subtitle' || prop_name === 'text') {
          return {
            ...item,
            in_details: false
          }
        }
        return {
          ...item,
          in_details: true
        }
      });
    } else if (type === "image") {
      arr = fields?.map((item, i) => {
        const { prop_name } = item;
        if (prop_name === 'position_name' || prop_name === 'title' || prop_name === 'subtitle' || prop_name === 'text') {
          return {
            ...item,
            in_details: false
          }
        }
        return {
          ...item,
          in_details: true
        }
      });
    } else if (type === "image_description") {
      arr = fields?.map((item, i) => {
        const { prop_name } = item;
        if (prop_name === 'position_name') {
          return {
            ...item,
            in_details: false
          }
        }
        return {
          ...item,
          in_details: true
        }
      });
    }
    else {
      arr = [...tblFields];
    }

    setFormFieldsTemp([...arr]);
  };


  const validateData = (data, field) => {
    let ret = data;
    switch (field) {
      case "id_position":
        let index = formFieldsTemp.findIndex((it) => { return it.prop_name === 'id_position' });
        let idPositionObject = formFieldsTemp[index];
        let path = `${idPositionObject?.fillFromApi}/${idPositionObject?.prop_name}?id_position=${ret?.id_position}`;
        api.get(path)
          .then((response) => {
            const idPositionArr = response?.payload;
            const selectedIdPositionItem = idPositionArr.find((systemItem) => systemItem.id === ret.id_position);
            if (selectedIdPositionItem) {
              filterFields(formFieldsTemp, selectedIdPositionItem.type);
              setIdPosition(ret?.id_position);
            }

          })
          .catch((error) => console.log(error));

        return ret;
      default:
        return ret;
    }
  }

  const getForm = async () => {
    let res;
    await api
      .get(`admin/banners-b2c/positions/slug/${idPosition}`)
      .then((response) => {
        res = response?.payload;
        if (res) {
          let dimensions = { width: res.width, height: res.height };
          let arr = [];
          switch (res.type) {
            case "image":
              arr = formFieldsTemp?.map((formItem, i) => {
                const { prop_name } = formItem;
                if (prop_name === 'image') {
                  return {
                    ...formItem,
                    dimensions: dimensions
                  }
                }
                return {
                  ...formItem,
                }
              });
              setFormFieldsTemp([...arr]);
              break;
            case "image_description":
              arr = formFieldsTemp?.map((formItem, i) => {
                const { prop_name } = formItem;
                if (prop_name === 'image') {
                  return {
                    ...formItem,
                    dimensions: dimensions
                  }
                }
                return {
                  ...formItem,
                }
              });
              setFormFieldsTemp([...arr]);
              break;
            case "gallery":
              arr = formFieldsTemp?.map((formItem, i) => {
                const { prop_name } = formItem;
                if (prop_name === 'image') {
                  return {
                    ...formItem,
                    dimensions: dimensions
                  }
                }
                return {
                  ...formItem,
                }
              });
              setFormFieldsTemp([...arr]);
              break;
            default:
              console.log("deafult")
              break;
          }
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const formatFormFields = (data) => {
    if (data) {
      const { allow_size, allow_format } = data;
      const descripiton = `Veličina fajla ne sme biti veća od ${allow_size / (1024 * 1024).toFixed(2)}MB. Dozvoljeni formati fajla: ${allow_format.map((format) => format.name).join(", ")}`;
      let arr = tblFields.map((field) => {
        if (field?.prop_name === 'image') {
          return {
            ...field,
            description: descripiton,
            validate: {
              imageUpload: data
            }
          };
        } else {
          return {
            ...field
          }
        }
      });
      setFormFieldsTemp([...arr]);
    }
  }

  useEffect(() => {
    if (idPosition) {
      getForm();
    }
  }, [idPosition]);

  useEffect(() => {
    handleInformationImage();
  }, [])

  return (
    <ListPage
      validateData={validateData}
      customActions={customActions}
      listPageId="B2Cbanners"
      title={"B2C baneri"}
      apiUrl="admin/banners-b2c/main"
      columnFields={formFieldsTemp}
      additionalButtons={buttons}
      actionNewButton="modal"
      useColumnFields={true}
      onNewButtonPress={() => {
        setFormFieldsTemp(tblFields);
      }}
    />
  );
};

export default B2Cbanners;
