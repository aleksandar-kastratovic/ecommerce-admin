import { Box, Icon } from "@mui/material";
import VariationSection from "./VariationSection";
import { useState } from "react";

import prices from "../../forms/prices.json";
import seo from "../../forms/seo.json";
import gallery from "../../forms/gallery.json";
import lager from "../../forms/inventories.json";
import basicData from "../../forms/product_variant_basic.json";

import styles from "./VariationList.module.scss";

const ProductVariation = ({ title = "", idProduct, idProductVariant }) => {
    const [open, setOpen] = useState(false);

    const pricesInit = {
        id: null,
        id_product: idProduct,
        id_product_variant: idProductVariant,
        system: "",
        country: 1,
        currency: "",
        type: "",
        group: "",
        price_single_with_out_vat: 0,
        price_single_with_vat: 0,
        price_vat_procent: 0,
        price_quantity: null,
        price_unit: "",
        active_to: "",
        price_with_out_vat: 0,
        price_with_vat: 0,
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

    return (
        <Box className={styles.productVariation}>
            <Box className={styles.productVariationTitle} onClick={() => setOpen(!open)}>
                {title} {open ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
            </Box>
            {open && (
                <Box className={styles.productVariationBody}>
                    <VariationSection
                        title="Osnovni podaci"
                        formFields={basicData}
                        type="form"
                        getUrl={`admin/productitems/variants/basic_data/${idProduct}/${idProductVariant}`}
                        postUrl="admin/productitems/variants/basic_data/"
                        idProduct={idProduct}
                        idProductVariant={idProductVariant}
                    />
                    <VariationSection
                        title="Cena"
                        formFields={prices}
                        type="list"
                        listUrl={`admin/productitems/variants/prices/${idProduct}/${idProductVariant}`}
                        postUrl={"admin/productitems/variants/prices/"}
                        deleteUrl={"admin/productitems/variants/prices"}
                        init={pricesInit}
                        idProduct={idProduct}
                        idProductVariant={idProductVariant}
                    />
                    <VariationSection
                        title="Lager"
                        formFields={lager}
                        type="list"
                        listUrl={`admin/productitems/variants/inventory/${idProduct}/${idProductVariant}`}
                        postUrl={"admin/productitems/variants/inventory/"}
                        deleteUrl={"admin/productitems/variants/inventory"}
                        init={lagerInit}
                        idProduct={idProduct}
                        idProductVariant={idProductVariant}
                    />
                    <VariationSection
                        title="Seo"
                        formFields={seo}
                        type="list"
                        listUrl={`admin/productitems/variants/seo/${idProduct}/${idProductVariant}`}
                        postUrl={"admin/productitems/variants/seo/"}
                        deleteUrl={"admin/productitems/variants/seo"}
                        init={seoInit}
                        idProduct={idProduct}
                        idProductVariant={idProductVariant}
                    />
                    <VariationSection title="Galerija" formFields={gallery} type="form" idProduct={idProduct} idProductVariant={idProductVariant} />
                </Box>
            )}
        </Box>
    );
};

export default ProductVariation;
