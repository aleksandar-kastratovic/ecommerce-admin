import { useState, useEffect } from "react";

import Box from "@mui/material/Box";

import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import VariationForm from "./VariationForm/VariationForm";
import ProductVariation from "./VariationList/ProductVariation";

const ProductDetailsVariation = ({ parentId }) => {
  const [variationAttributes, setVariationAttributes] = useState([]);
  const [initSelected, setInitSelected] = useState([]);
  const [variants, setVariants] = useState([]);
  const api = useAPI();

  const getVariants = () => {
    api.get(`admin/product-items/variants/main/product/${parentId}`)
      .then((response) => {
        setVariants(response?.payload);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const getVariationAttributes = () => {
    api.get(`admin/product-items/variants/main/product-attributes/${parentId}`)
      .then((response) => {
        setVariationAttributes(response?.payload);
        setInitSelectedKeys(response?.payload);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  useEffect(() => {
    getVariationAttributes();
    getVariants();
  }, []);

  const onSubmit = (data) => {
    const req = { data: [], values: { id_parent: Number(parentId) } };
    for (const field of data) {
      for (const value of field.values) {
        if (value.selected) {
          req.data.push({
            id_product_parent: Number(parentId),
            id_attribute: value.id_group_attribute,
            slug_attribute: field.attr.slug,
            name_attribute: field.attr.name,
            id_attribute_value: value.id,
            slug_attribute_value: value.slug,
            name_attribute_value: value.name,
          });
        }
      }
    }
    api.post("admin/product-items/variants/main/save", req)
      .then((response) => {
        getVariationAttributes();
        getVariants();
        toast.success(`Uspešno`);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const setInitSelectedKeys = (values) => {
    let keys = [];
    values.map((row) => {
      row.values.map((r) => {
        if (r.selected) {
          keys.push({
            key: r.id_group + "_" + r.id_group_attribute + "_" + r.id,
            attr: row.attr.name,
            val: r.name,
            selected: r.selected,
          });
        }
      });
    });
    setInitSelected(keys);
  };

  return (
    <Box>
      {variationAttributes.length > 0 ? <VariationForm fields={variationAttributes} initSelected={initSelected} onSumbit={onSubmit} /> : <p>Nema definisanih atributa za kreiranje varijanti.</p>}

      <Box>
        <h4>Lista varijanti</h4>
        {variants.length > 0 ? (
          variants.map((variant) => {
            return <ProductVariation title={variant.attributes_text} key={variant.id} productParentId={parentId} productId={variant.id} status={variant.status === "on"} />;
          })
        ) : (
          <p>Trenutno ne postoje varijante za prikaz.</p>
        )}
      </Box>
    </Box>
  );
};

export default ProductDetailsVariation;
