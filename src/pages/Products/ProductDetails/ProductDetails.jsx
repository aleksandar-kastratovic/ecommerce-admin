import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Specification from "./ProductDetailsSpecification/Specification";
import ProductDetailsVariation from "./ProductDetailsVariation/ProductDetailsVariation";
import useAPI from "../../../api/api";
import IconList from "../../../helpers/icons";
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import Form from "../../../components/shared/Form/Form";
import Declaration from "./panels/Declaration";
import Seo from "./panels/Seo";
import Description from "./panels/Description";
import Prices from "./panels/Prices";

import basic_data from "./forms/basic_data.json";
import Inventories from "./panels/Inventories";
import Categories from "./panels/Categories";
import Gallery from "./panels/Gallery";
import TechnicalDoc from "./panels/TechnicalDoc";
import Instruction from "./panels/Instruction";
import Certificate from "./panels/Certificate";

const ProductDetails = () => {
    const { prodId } = useParams();

    const init = {
        id: null,
        b2b_active: false,
        b2c_active: false,
        name: null,
        sku: null,
        barcode: null,
        new: false,
        new_from: null,
        new_to: null,
        status: "on",
    };

    const [data, setData] = useState(init);
    const api = useAPI();

    const handleSubmit = (data) => {
        api.post(`admin/product-items/basic-data/`, data)
            .then((response) => {
                toast.success("Uspešno");
                setData(response?.payload);
            })
            .catch((error) => {
                console.warn(error);
                toast.warning("Greška");
            });
    };

    const handleData = () => {
        api.get(`admin/product-items/basic-data/${prodId}`)
            .then((response) => setData(response?.payload))
            .catch((error) => console.warn(error));
    };

    useEffect(() => {
        handleData();
    }, []);

    const fields = [
        {
            name: "Osnovno",
            icon: "settings",
            enabled: true,
            component: <Form formFields={basic_data} initialData={data} onSubmit={handleSubmit} />,
        },
        {
            name: "Deklaracija",
            icon: IconList.editDocument,
            enabled: data?.id,
            component: <Declaration productId={prodId} />,
        },
        {
            name: "SEO",
            icon: IconList.search,
            enabled: data?.id,
            component: <Seo productId={prodId} />,
        },
        {
            name: "Opis",
            icon: IconList.description,
            enabled: data?.id,
            component: <Description productId={prodId} />,
        },
        {
            name: "Cene",
            icon: IconList.money,
            enabled: data?.id,
            component: <Prices productId={prodId} />,
        },
        {
            name: "Lager",
            icon: IconList.inventory,
            enabled: data?.id,
            component: <Inventories productId={prodId} />,
        },
        {
            name: "Kategorije",
            icon: IconList.category,
            enabled: data?.id,
            component: <Categories productId={prodId} />,
        },
        {
            name: "Galerija",
            icon: IconList.browseGallery,
            enabled: data?.id,
            component: <Gallery productId={prodId} />,
        },
        {
            name: "Tehnička dokumentacija",
            icon: IconList.documentScanner,
            enabled: data?.id,
            component: <TechnicalDoc productId={prodId} />,
        },
        {
            name: "Sertifikati",
            icon: IconList.documentScanner,
            enabled: data?.id,
            component: <Certificate productId={prodId} />,
        },
        {
            name: "Instrukcije",
            icon: IconList.documentScanner,
            enabled: data?.id,
            component: <Instruction productId={prodId} />,
        },
        {
            name: "Specifikacije",
            icon: IconList.documentScanner,
            enabled: data?.id,
            component: <Specification productId={prodId} />,
        },
        {
            name: "Varijacije",
            icon: IconList.difference,
            enabled: data?.id,
            component: <ProductDetailsVariation productId={prodId} />,
        },
    ];

    return <DetailsPage title={prodId === "new" ? "Unos novog proizvoda" : data?.name} fields={fields} ready={[prodId === "new" || data?.id]} />;
};

export default ProductDetails;
