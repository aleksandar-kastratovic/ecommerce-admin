import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";
import useAPI from "../../api/api";


const B2Bbanners = ({ }) => {
  const navigate = useNavigate();
  const [formFieldsTemp, setFormFieldsTemp] = useState(tblFields);
  const [idPosition, setIdPosition] = useState(null);
  const api = useAPI();

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
          // filterFields(formFieldsTemp, rowData?.type);
          getForm();
          return {
            show: true,
            id: rowData.id
          };
        },
      },
    },
  }

  const filterFields = (fields, type) => {
    let arr = [];

    if (type === "gallery") {
      console.log("Upao! - gallery");
      arr = fields?.map((item, i) => {
        const { prop_name } = item;
        if (prop_name === 'position_name' || prop_name === 'title' || prop_name === 'subtitle' || prop_name === 'text') {
          return {
            ...item,
            in_details: false
          }
        }
        return {
          ...item
        }
      });
    } else if (type === "image") {
      console.log("Upao! - image");
      arr = fields?.map((item, i) => {
        const { prop_name } = item;
        if (prop_name === 'position_name' || prop_name === 'title' || prop_name === 'subtitle' || prop_name === 'text') {
          return {
            ...item,
            in_details: false
          }
        }
        return {
          ...item
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
    console.log("data b2b baner::::", ret)
    console.log("field b2b baner::::", field)
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
      .get(`admin/banners-b2b/positions/slug/${idPosition}`)
      .then((response) => {
        res = response?.payload;
        if (res) {
          let dimensions = { width: res.width, height: res.height };
          console.log("DImenzije", dimensions);
          console.log("Tip galerija:", res?.type);
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

  useEffect(() => {
    if (idPosition) {
      getForm();
    }
  }, [idPosition]);


  return (
    <ListPage
      validateData={validateData}
      customActions={customActions}
      listPageId="B2Bbanners"
      title={"B2B baneri"}
      apiUrl="admin/banners-b2b/main"
      columnFields={formFieldsTemp}
      actionNewButton="modal"
      additionalButtons={buttons}
      useColumnFields={true}
      onNewButtonPress={() => {
        setFormFieldsTemp(tblFields);
      }}
    />
  );
};

export default B2Bbanners;
