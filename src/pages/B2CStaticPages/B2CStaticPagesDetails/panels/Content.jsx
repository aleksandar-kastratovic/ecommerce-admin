import React, { useEffect, useState } from 'react';
import ListPage from '../../../../components/shared/ListPage/ListPage';
import useAPI from '../../../../api/api';
import formFields from '../forms/content.json';
import { toast } from 'react-toastify';

const Content = ({ pageId }) => {
  const api = useAPI();
  const apiPathGallery = "admin/static-pages-b2c/gallery";
  const apiPathContent = "admin/static-pages-b2c/content";

  const [selectedRow, setSelectedRow] = useState({});
  const [formFieldsTemp, setFormFieldsTemp] = useState(formFields);
  const [hideSubmitModalButton, setHideSubmitModalBUtton] = useState(true);
  const [modalFormTitle, setModalFormTitle] = useState(null);

  const [modalObject, setModalObject] = useState(null);
  const [loading, setLoading] = useState(false);

  const formFieldsOne = formFields;

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

          api.delete(`admin/static-pages-b2c/content/${rowData.id}`)
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
    setLoading(true);
    const handleSubmit = (data) => {
      let req = {
        id: data.new ? null : data.id,
        id_static_pages: pageId ?? null,
        id_static_pages_content: selectedRow.id ?? null,
        file_base64: data.src,
        order: data.position ?? 0,
        title: null,
        subtitle: null,
        short_description: null,
        description: null
      };
      api.post(`${apiPathGallery}`, req)
        .then((response) => {
          toast.success("Uspešno");
          setLoading(false);
        })
        .catch((error) => {
          toast.warn("Greška");
          console.warn(error);
          setLoading(false);
        });
    };
    return handleSubmit;
  }

  const handleDelete = (id) => {
    setLoading(true);
    api.delete(`${apiPathGallery}/${id}`)
      .then((response) => {
        toast.success("Uspešno");
        setLoading(false);
      })
      .catch((error) => {
        toast.warn("Greška");
        console.warn(error);
        setLoading(false);
      });
  };

  const handleReorder = (id, destination) => {
    setLoading(true);
    api.put(`${apiPathGallery}/order`, { id: id, order: destination })
      .then((response) => {
        toast.success("Uspešno");
        setLoading(false);
      })
      .catch((error) => {
        toast.warn("Greška");
        console.warn(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    formFieldsOne.map((field) => {
      if (field.prop_name == 'content_multiple_images') {
        field.uploadHandler = handleSubmitWrapper(pageId, selectedRow);
        field.deleteHandler = handleDelete;
        field.handleReorder = handleReorder;
      }
    });
  }, [selectedRow])

  const updateNewFieldsInDetails = (fields, field, edit, data, disableType = false) => {
    if (field === "") {
      handleSubmitWrapper(pageId, selectedRow);
    } else {
      if (data) {
        saveData(data);
      }
    }
    fields.map((item, i) => {
      if (item.prop_name !== 'type' && item.prop_name !== 'order' && item.prop_name !== 'slug') {
        if (item.input_type === field) {
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
        updateNewFieldsInDetails(formFieldsOne, ret?.type, false, ret, true);
        setHideSubmitModalBUtton(true);
        return ret;
      default:
        return ret;
    }
  };
  return (
    <>
      <ListPage
        validateData={validateData}
        listPageId="B2CContent"
        apiUrl={`admin/static-pages-b2c/content/${pageId}`}
        editUrl={`admin/static-pages-b2c/content/${pageId}`}
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