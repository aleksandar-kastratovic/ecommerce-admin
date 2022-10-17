import { Box, Icon } from "@mui/material";
import VariationSection from "./VariationSection";
import { useState } from "react";

import prices from "../../forms/prices.json";
import seo from "../../forms/seo.json";
import gallery from "../../forms/gallery.json";
import lager from "../../forms/inventories.json";
import basicData from "../../forms/product_variant_basic.json";

import styles from "./VariationList.module.scss";
import { InputSwitch } from "../../../../../components/shared/Form/FormInputs/FormInputs";
import useAPI from "../../../../../api/api";
import { priceValidate } from "../../../utils/PriceValidate";
import VariationGallery from "./VariationGallery";

const ProductVariation = ({ title = "", idProduct, idProductVariant, status }) => {
    const [open, setOpen] = useState(false);
    const api = useAPI();

    const [variantStatus, setVariantStatus] = useState(status);

    const basicInit = {
        id_product: idProduct,
        id_product_variant: idProductVariant,
        name: null,
        sku: null,
        barcode: null,
        short_description: null,
    };

    const pricesInit = {
        id: null,
        id_product: idProduct,
        id_product_variant: idProductVariant,
        id_price_structure: null,
        system: "",
        country: "",
        currency: "",
        type: "",
        group: "",
        price_single_with_out_vat: null,
        price_single_with_vat: null,
        price_vat_procent: "20.00",
        price_quantity: 1,
        price_unit: "kom",
        price_with_out_vat: null,
        price_with_vat: null,
    };

    const seoInit = {
        id: null,
        id_product: idProduct,
        id_product_variant: idProductVariant,
        id_country: 0,
        lang: "",
        slug: "",
        meta_title: "",
        meta_keywords: "",
        meta_description: "",
        meta_url: "",
        active: 1,
        order: 1,
    };

    const lagerInit = {
        id: null,
        id_product: idProduct,
        id_product_variant: idProductVariant,
        id_store: null,
        quantity: 0,
        unit: "",
    };

    const setStatus = (status) => {
        api.post(`admin/product-items/variants/main/change-status/${idProduct}/${idProductVariant}`, { status })
            .then((response) => console.log(response))
            .catch((error) => console.warn(error));
    };

    return (
        <Box className={styles.productVariation}>
            <Box
                className={styles.productVariationHeading}
                onClick={(event) => {
                    if (event.target.name !== "status") {
                        setOpen(!open);
                    }
                }}
            >
                <span className={styles.productVariationTitle}>{title}</span>

                <InputSwitch
                    label="Status"
                    fullWidth={false}
                    name="status"
                    value={variantStatus ?? false}
                    onChange={({ target }) => {
                        setVariantStatus(target.checked);
                        setStatus(target.checked);
                    }}
                />
                {open ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
            </Box>
            {open && (
                <Box className={styles.productVariationBody}>
                    <VariationSection
                        title="Osnovni podaci"
                        formFields={basicData}
                        type="form"
                        getUrl={`admin/product-items/variants/basic-data/${idProduct}/${idProductVariant}`}
                        postUrl="admin/product-items/variants/basic-data/"
                        idProduct={idProduct}
                        idProductVariant={idProductVariant}
                        init={basicInit}
                    />
                    <VariationSection
                        title="Cena"
                        formFields={prices}
                        type="list"
                        listUrl={`admin/product-items/variants/prices/${idProduct}/${idProductVariant}`}
                        postUrl={"admin/product-items/variants/prices/"}
                        deleteUrl={"admin/product-items/variants/prices"}
                        init={pricesInit}
                        idProduct={idProduct}
                        idProductVariant={idProductVariant}
                        validateData={priceValidate}
                    />
                    <VariationSection
                        title="Lager"
                        formFields={lager}
                        type="list"
                        listUrl={`admin/product-items/variants/inventory/${idProduct}/${idProductVariant}`}
                        postUrl={"admin/product-items/variants/inventory/"}
                        deleteUrl={"admin/product-items/variants/inventory"}
                        init={lagerInit}
                        idProduct={idProduct}
                        idProductVariant={idProductVariant}
                    />
                    <VariationSection
                        title="Seo"
                        formFields={seo}
                        type="list"
                        listUrl={`admin/product-items/variants/seo/${idProduct}/${idProductVariant}`}
                        postUrl={"admin/product-items/variants/seo/"}
                        deleteUrl={"admin/product-items/variants/seo"}
                        init={seoInit}
                        idProduct={idProduct}
                        idProductVariant={idProductVariant}
                    />
                    <VariationSection title="Galerija" formFields={gallery} type="children" idProduct={idProduct} idProductVariant={idProductVariant}>
                        <VariationGallery productId={idProduct} idProductVariant={idProductVariant} />
                    </VariationSection>
                </Box>
            )}
        </Box>
    );
};

export default ProductVariation;
