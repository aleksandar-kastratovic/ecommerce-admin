import React, { useContext, useEffect, useState } from 'react';
import ListPage from '../../../../components/shared/ListPage/ListPage';
import formFields from '../forms/content.json';
import { toast } from 'react-toastify';
import AuthContext from '../../../../store/auth-contex';

const Content = ({ pageId }) => {
  const authCtx = useContext(AuthContext);
  const { api } = authCtx;
  const apiPathGallery = "admin/static-pages-b2b/gallery";
  const apiPathContent = "admin/static-pages-b2b/content";
  const apiPathCrop = "admin/static-pages-b2b/gallery/image-crop";

  const [selectedRow, setSelectedRow] = useState({});
  const [formFieldsTemp, setFormFieldsTemp] = useState(formFields);
  const [hideSubmitModalButton, setHideSubmitModalBUtton] = useState(true);
  const [modalFormTitle, setModalFormTitle] = useState(null);
  const [imageInfo, setImageInfo] = useState(null);
  const [modalObject, setModalObject] = useState(null);

  const formFieldsOne = formFields;

  const handleInformationImage = () => {
    api.get(`admin/static-pages-b2b/gallery/options/upload`)
      .then((response) => {
        formatFormFields(response.payload);
        setImageInfo(response.payload);
      })
      .catch((error) => console.warn(error));
  };

  const customActions = {
    edit: {
      clickHandler: {
        type: 'modal_form',
        fnc: (rowData) => {
          setHideSubmitModalBUtton(true);
          updateNewFieldsInDetails(formFieldsTemp, rowData?.input_type, true, null);
          setSelectedRow(rowData);
          setModalObject(null);
          setModalFormTitle(null);

          return {
            show: true,
            id: rowData.id
          };
        },
      },
    },
    delete: {
      clickHandler: {
        type: 'dialog_delete',
        fnc: (rowData) => {
          return {
            show: true,
            id: rowData.id,
            mutate: null,
          };
        },
      },
      deleteClickHandler: {
        type: 'dialog_delete',
        fnc: (rowData) => {

          api.delete(`admin/static-pages-b2b/content/${rowData.id}`)
            .then(() => toast.success("Zapis je uspešno obrisan"))
            .catch(() => toast.warning("Došlo je do greške prilikom brisanja"));

          return {
            show: false,
            id: rowData.id,
            mutate: 1,
          };
        }
      },
    },
  };

  const prepareInitialData = (values) => {
    if (values?.content_multiple_images) {
      values.content_multiple_images = (values?.content_multiple_images ?? [])
        .filter((item) => item.file_base64 != null)
        .map((item) => {
          let base64 = item.file_base64;
          const type = base64.split(";")[0].split(":")[1];
          let y = base64[base64.length - 2] === "=" ? 2 : 1;
          const size = base64.length * (3 / 4) - y;
          return { id: item.id, name: item.file_filename, position: item.order, alt: item.file_filename, size: size, type: type, src: base64 };
        });
    }
    return values;
  }

  const handleSubmitWrapper = (pageId, selectedRow) => {

    const handleSubmit = (data, options = {}) => {
      const allowedFormats = imageInfo ? imageInfo.allow_format.map(format => format?.mime_type.toLowerCase()) : [];
      const allowSize = imageInfo ? Number(imageInfo.allow_size) : 0;
      const fileExtension = data?.type.toLowerCase();
      const fileSizeInB = Number(data.size);

      if (allowedFormats.length > 0 && allowedFormats.includes(fileExtension)) {
        if (fileSizeInB > allowSize) {
          toast.error(`Veličina slike je prevelika. Maksimalna dozvoljena veličina je ${allowSize / (1024 * 1024)} MB.`);
        } else {
          let req = {
            id: data.new ? null : data.id,
            id_static_pages: pageId ?? null,
            id_static_pages_content: selectedRow?.id ?? null,
            file_base64: data.src,
            order: data.position ?? 0,
            title: null,
            subtitle: null,
            short_description: null,
            description: null
          };

          let postApi = options?.crop ? apiPathCrop : apiPathGallery;
          api.post(`${postApi}`, req)
            .then((response) => {
              toast.success("Uspešno");
            })
            .catch((error) => {
              toast.warn("Greška");
              console.warn(error);
            });
        };

      } else {
        toast.error(`Nedozvoljeni format slike. Dozvoljeni formati su: ${allowedFormats.join(", ")}`);
      }
    };
    return handleSubmit;
  }

  const handleDelete = (id) => {
    api.delete(`${apiPathGallery}/${id}`)
      .then((response) => {
        toast.success("Uspešno");
      })
      .catch((error) => {
        toast.warn("Greška");
        console.warn(error);
      });
  };

  const handleReorder = (id, destination) => {
    api.put(`${apiPathGallery}/order`, { id: id, order: destination })
      .then((response) => {
        toast.success("Uspešno");
      })
      .catch((error) => {
        toast.warn("Greška");
        console.warn(error);
      });
  };

  useEffect(() => {
    formFieldsOne.map((field) => {
      if (field.prop_name == 'content_multiple_images') {
        field.uploadHandler = handleSubmitWrapper(pageId, selectedRow);
        field.deleteHandler = handleDelete;
        field.handleReorder = handleReorder;
        field.description = `Dozvoljeni formati su: ${imageInfo?.allow_format.map(format => format?.name.toLowerCase()).join(", ")}. Maksimalna dozvoljena veličina je ${imageInfo?.allow_size / (1024 * 1024)} MB.`;
      }
    });
  }, [selectedRow])

  const updateNewFieldsInDetails = (fields, field, edit, data, disableType = false) => {
    console.log("Field:", field);
    console.log("Data:", data);
    console.log("Fields:", fields);
    if (field === "") {
      handleSubmitWrapper(pageId, selectedRow);
    } else {
      if (data) {
        saveData(data);
      }
    }
    fields.map((item, i) => {
      if (item.prop_name !== 'type' && item.prop_name !== 'order' && item.prop_name !== 'slug') {
        if (item.input_type === field || item.input_type === "multiple_images_one") {
          item.in_details = true;
        } else {
          item.in_details = false;
        }
      } else {
        if (edit) {
          if (item.input_type === 'number' || item.prop_name === 'slug') {
            item.disabled = false;
          } else {
            item.disabled = true;
          }

        } else {
          if (disableType && item.prop_name !== 'order') {
            item.disabled = true;
          } else {
            item.disabled = false;
          }
        }

        if (!edit && item.prop_name === 'order') {
          item.in_details = false;
        } else {
          item.in_details = true;
        }

      }
    });
    setFormFieldsTemp([...fields]);
  };

  const saveData = (data) => {
    setModalFormTitle("Izmeni");
    api.post(`${apiPathContent}/${pageId}`, { ...data, id_static_pages: pageId })
      .then((response) => {
        toast.success(`Uspešno`);
        setSelectedRow(response?.payload);
        setModalObject(response?.payload);
      })
      .catch((error) => {
        console.warn(error);
        toast.warning("Greška");
      });
  }

  const validateData = (data, field) => {
    let ret = data;
    switch (field) {
      case "type":
        console.log("Data from validate data:", ret);
        updateNewFieldsInDetails(formFieldsOne, ret?.type, false, ret, true);
        setHideSubmitModalBUtton(true);
        return ret;
      default:
        return ret;
    }
  };


  const formatFormFields = (data) => {
    if (data) {
      const { allow_size, allow_format } = data;
      const descripiton = `Veličina fajla ne sme biti veća od ${allow_size / (1024 * 1024).toFixed(2)}MB. Dozvoljeni formati fajla: ${allow_format.map((format) => format.name).join(", ")}`;
      let arr = formFields.map((field) => {
        if (field?.prop_name === 'content_multiple_images') {
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
    handleInformationImage();
  }, [])

  return (
    <>
      <ListPage
        validateData={validateData}
        listPageId="B2CContent"
        apiUrl={`admin/static-pages-b2b/content/${pageId}`}
        editUrl={`admin/static-pages-b2b/content/${pageId}`}
        initialData={{ id_static_pages: pageId }}
        title=" "
        columnFields={formFieldsTemp}
        actionNewButton="modal"
        customActions={customActions}
        onNewButtonPress={() => {
          setHideSubmitModalBUtton(false);
          updateNewFieldsInDetails(formFields, '', false, null);
          setModalObject(null);
          setModalFormTitle(null);
        }}
        prepareInitialData={prepareInitialData}
        withoutSetterFunction
        submitButtonForm={hideSubmitModalButton}
        modalObject={modalObject}
        useColumnFields={true}
        useModalGalleryInjection={true}
        customTitleModalForm={modalFormTitle}
      />
    </>
  );
}

export default Content