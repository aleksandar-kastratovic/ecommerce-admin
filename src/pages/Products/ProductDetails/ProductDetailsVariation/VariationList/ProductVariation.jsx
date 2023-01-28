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

const ProductVariation = ({ title = "", productParentId, productId, status }) => {
    const [open, setOpen] = useState(false);
    const api = useAPI();

    const [variantStatus, setVariantStatus] = useState(status);

    const basicInit = {
        id_product_parent: productParentId,
        id_product: productId,
        name: null,
        sku: null,
        barcode: null,
        short_description: null,
    };

    const pricesInit = {
        id: null,
        id_product_parent: productParentId,
        id_product: productId,
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
        id_product_parent: productParentId,
        id_product: productId,
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
        id_product_parent: productParentId,
        id_product: productId,
        id_store: null,
        quantity: 0,
        unit: "",
    };

    const setStatus = (status) => {
        api.post(`admin/product-items/variants/main/change-status/${productParentId}/${productId}`, { status })
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
                        getUrl={`admin/product-items/variants/basic-data/${productParentId}/${productId}`}
                        postUrl="admin/product-items/variants/basic-data/"
                        productParentId={productParentId}
                        productId={productId}
                        init={basicInit}
                    />
                    <VariationSection
                        title="Cena"
                        formFields={prices}
                        type="list"
                        listUrl={`admin/product-items/variants/prices/${productParentId}/${productId}`}
                        postUrl={"admin/product-items/variants/prices/"}
                        deleteUrl={"admin/product-items/variants/prices"}
                        init={pricesInit}
                        productParentId={productParentId}
                        productId={productId}
                        validateData={priceValidate}
                    />
                    <VariationSection
                        title="Lager"
                        formFields={lager}
                        type="list"
                        listUrl={`admin/product-items/variants/inventory/${productParentId}/${productId}`}
                        postUrl={"admin/product-items/variants/inventory/"}
                        deleteUrl={"admin/product-items/variants/inventory"}
                        init={lagerInit}
                        productParentId={productParentId}
                        productId={productId}
                    />
                    <VariationSection
                        title="Seo"
                        formFields={seo}
                        type="list"
                        listUrl={`admin/product-items/variants/seo/${productParentId}/${productId}`}
                        postUrl={"admin/product-items/variants/seo/"}
                        deleteUrl={"admin/product-items/variants/seo"}
                        init={seoInit}
                        productParentId={productParentId}
                        productId={productId}
                    />
                    <VariationSection title="Galerija" formFields={gallery} type="children" productParentId={productParentId} productId={productId}>
                        <VariationGallery productParentId={productParentId} productId={productId} />
                    </VariationSection>
                </Box>
            )}
        </Box>
    );
};

export default ProductVariation;
