import React, { useEffect, useState } from 'react';
import ListPage from '../../../../components/shared/ListPage/ListPage';
import useAPI from '../../../../api/api';
import formFields from '../forms/content.json';
import { toast } from 'react-toastify';

const Content = ({ pageId }) => {
  const api = useAPI();
  const apiPathGallery = "admin/static-pages-b2c/gallery";

  const [selectedRow, setSelectedRow] = useState({});
  const [selectedFieldType, setSelectedFieldType] = useState('');

  const customActions = {
    edit: {
      clickHandler: {
        type: 'modal_form',
        fnc: (rowData) => {

          console.log(rowData);

          setSelectedRow(rowData);

          console.log(selectedRow);

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

  const handleSubmitWrapper = (pageId, selectedRow) => {

    const handleSubmit = (data) => {

      console.log('handleSubmit data', data);
      console.log('handleSubmit selectedRow', selectedRow);
      console.log('handleSubmit pageId', pageId);

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

      console.log('handleSubmit req', req);

      api.post(`${apiPathGallery}`, req)
        .then((response) => {
          toast.success("Uspešno");
          handleData();
        })
        .catch((error) => {
          toast.warn("Greška");
          console.warn(error);
        });
    };

    return handleSubmit;
  }

  const handleDelete = (id) => {
    api.delete(`${apiPathGallery}/${id}`)
      .then((response) => {
        toast.success("Uspešno");
        handleData();
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
    formFields.map((field) => {
      if (field.prop_name == 'content_multiple_images') {
        field.uploadHandler = handleSubmitWrapper(pageId, selectedRow);
        field.deleteHandler = handleDelete;
        field.handleReorder = handleReorder;

        console.log('useEffect selectedRow', selectedRow);
        console.log('useEffect pageId', pageId);
      }
    });
  }, [selectedRow])

  const updateNewFieldsInDetails = (data, isNew) => {
    const newFromField = data.find((item) => item.prop_name === "new_from");
    const newToField = data.find((item) => item.prop_name === "new_to");

    if (isNew) {
      newFromField.in_details = true;
      newToField.in_details = true;
    } else {
      console.log(isNew)
      newFromField.in_details = false;
      newToField.in_details = false;
    }
  };

  const validateData = (data, field) => {
    let ret = data;
    console.log(ret)
    switch (field) {
      case "type":
        updateNewFieldsInDetails(formFields, ret.new);
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
        editUrl={`admin/static-pages-b2c/content`}
        initialData={{ id_static_pages: pageId }}
        title=" "
        columnFields={formFields}
        actionNewButton="modal"
        customActions={customActions}
      />
    </>
  );
}

export default Content