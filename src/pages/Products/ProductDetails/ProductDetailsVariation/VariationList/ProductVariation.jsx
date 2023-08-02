import { useEffect, useState } from "react";

import prices from "../../forms_variation/prices.json";
import seo from "../../forms_variation/seo.json";
import gallery from "../../forms_variation/gallery.json";
import lagerData from "../../forms_variation/inventories.json";
import basicData from "../../forms_variation/product_variant_basic.json";

import ListPage from "../../../../../components/shared/ListPage/ListPage";
import useAPI from "../../../../../api/api";
import { toast } from "react-toastify";

const ProductVariation = ({ parentId, tblFields }) => {

  const api = useAPI();

  const [fields, setFields] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [showSubmitModalButton, setShowSubmitModalButton] = useState(true);
  const apiPathGallery = "admin/product-items/variants/gallery";

  const galleryFormFields = gallery;

  const filterFields = (event, fieldBhavior, column) => {
    const { type } = fieldBhavior;
    switch (type) {
      case 'click':
        const { show_fields } = fieldBhavior;
        switch (show_fields) {
          case 'seo_field':
            setFields(seo);
            break;
          case 'basic_data':
            setFields(basicData);
            break;
          case 'lager_field':
            setFields(lagerData);
            break;
          case 'price_field':
            setFields(prices);
            break;
          case 'gallery_field':
            // setFields(gallery);
            break;
          default:
            setFields(null);
            break
        }
        break;
      case 'double_click':
        console.log("Double click");
        break;
      default:
        console.log("Default");
        break;
    }
  }

  const prepareInitialData = (values) => {
    if (values?.gallery) {
      values.gallery = (values?.gallery ?? [])
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

  const handleSubmitWrapper = (parentId, selectedColumn) => {
    const { urls, row } = selectedColumn;
    const handleSubmit = (data) => {
      let req = {
        id: data.new ? null : data.id,
        id_product: row?.id ?? null,
        id_product_parent: parentId ?? null,
        file_base64: data.src,
        order: data.position ?? 0,
        title: null,
        subtitle: null,
        short_description: null,
        description: null,
      };
      api.post(`${urls['save']?.url}`, req)
        .then((response) => {
          toast.success("Uspešno");
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
    if (selectedColumn) {
      const { galleryData, column } = selectedColumn;
      if (column?.prop_name === 'gallery') {
        galleryFormFields?.map((item) => {
          if (item?.prop_name === 'gallery') {
            item.uploadHandler = handleSubmitWrapper(parentId, galleryData);
            item.deleteHandler = handleDelete;
            item.handleReorder = handleReorder;
          }
        });
        setFields(galleryFormFields);
      }
    }
  }, [selectedColumn])

  return (
    <ListPage
      columnFields={tblFields}
      useColumnFields={true}
      showNewButton={false}
      listPageId="ListVariants"
      apiUrl={`admin/product-items/variants/list/${parentId}`}
      title=" "
      actionNewButton="modal"
      initialData={{ id_product_parent: parentId }}
      onClickFieldBehavior={
        (event, fieldBhavior, column, row, galleryData) => {
          if (column?.prop_name === 'gallery') {
            setShowSubmitModalButton(false);
          } else {
            setShowSubmitModalButton(true);
          }
          filterFields(event, fieldBhavior, column);
          setSelectedColumn({ column, galleryData });
        }
      }
      customFields={fields}
      onModalCancel={() => { setFields(null) }}
      withoutSetterFunction
      prepareInitialData={prepareInitialData}
      useModalGalleryInjection={true}
      submitButtonForm={showSubmitModalButton}
      closeButtonModalForm={!showSubmitModalButton}
    />
  );
};

export default ProductVariation;
