import { Box } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import useAPI from "../../../../api/api";
import VariationForm from "./VariationForm/VariationForm";
import ProductVariation from "./VariationList/ProductVariation";

const ProductDetailsVariation = ({ productId }) => {
    const [variationAttributes, setVariationAttributes] = useState([]);
    const [variants, setVariants] = useState([]);
    const api = useAPI();

    const getVariants = () => {
        api.get(`admin/product-items/variants/main/product/${productId}`)
            .then((response) => {
                setVariants(response?.payload);
            })
            .catch((error) => {
                console.warn(error);
            });
    };

    useEffect(() => {
        api.get(`admin/product-items/variants/main/product-attributes/${productId}`)
            .then((response) => {
                setVariationAttributes(response?.payload);
            })
            .catch((error) => {
                console.warn(error);
            });
        getVariants();
    }, []);

    const onSubmit = (data) => {
        const req = { data: [], values: { id_product: Number(productId) } };
        for (const field of data) {
            for (const value of field.values) {
                if (value.selected) {
                    req.data.push({
                        id_product: Number(productId),
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
                console.log(response);
                getVariants();
            })
            .catch((error) => {
                console.warn(error);
            });
    };
    return (
        <Box>
            <VariationForm fields={variationAttributes} onSumbit={onSubmit} />

            <Box>
                <h4>Lista varijanti</h4>
                {variants.map((variant) => {
                    return <ProductVariation title={variant.attributes_text} key={variant.id} idProduct={productId} idProductVariant={variant.id} status={variant.status === "on"} />;
                })}
            </Box>
        </Box>
    );
};

export default ProductDetailsVariation;
