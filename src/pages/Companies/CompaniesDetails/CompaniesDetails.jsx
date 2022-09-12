import { Box } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import useAPI from "../../../api/api";

import basic_data from "./forms/basic_data.json";
import contact from "./forms/contact.json";
import delivery_address from "./forms/delivery_address.json";
import notes from "./forms/notes.json";
import sales from "./forms/sales_officer.json";
import users from "./forms/users.json";
import IconList from "../../../helpers/icons";
import HeadOffice from "./panels/HeadOffice";
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import ListPanel from "./panels/ListPanel";
import Form from "../../../components/shared/Form/Form";
import { toast } from "react-toastify";

const CompaniesDetails = () => {
    const { comId } = useParams();

    const init = {
        id: null,
        id_category_product_groups: 0,
        parent_id: null,
        slug: "",
        name: "",
        order: 0,
        active: 1,
    };

    const [data, setData] = useState(init);
    const api = useAPI();

    const handleData = () => {
        api.get(`admin/customers-b2b/basic_data/${comId}`)
            .then((response) => setData(response?.payload))
            .catch((error) => console.warn(error));
    };

    const saveData = (data) => {
        api.post(`admin/customers-b2b/basic_data`, data)
            .then((response) => {
                setData(response?.payload);
                toast.success("Uspešno");
            })
            .catch((error) => {
                console.warn(error);
                toast.warn("Greška");
            });
    };

    useEffect(() => {
        handleData();
    }, []);

    const fields = [
        {
            name: "Osnovne informacije",
            icon: IconList.dataThresholding,
            enabled: true,
            component: <Form formFields={basic_data} initialData={data} onSubmit={saveData} />,
        },
        {
            name: "Sedište",
            icon: IconList.locationCity,
            enabled: data?.id,
            component: <HeadOffice companyId={comId} />,
        },
        {
            name: "Adresa dostave",
            icon: IconList.locationCity,
            enabled: data?.id,
            component: <ListPanel companyId={comId} apiPath="admin/customers-b2b/delivery_address" formFields={delivery_address} init={{}} />,
        },
        {
            name: "Kontakt",
            icon: IconList.contactPage,
            enabled: data?.id,
            component: <ListPanel companyId={comId} apiPath="admin/customers-b2b/contact" formFields={contact} init={{}} />,
        },
        {
            name: "Napomene",
            icon: IconList.note,
            enabled: data?.id,
            component: <ListPanel companyId={comId} apiPath="admin/customers-b2b/notes" formFields={notes} init={{}} />,
        },
        {
            name: "Komercijalista",
            icon: IconList.locationCity,
            enabled: data?.id,
            component: <ListPanel companyId={comId} apiPath="admin/customers-b2b/sales_officer" formFields={sales} init={{}} />,
        },
        {
            name: "Korisnici",
            icon: IconList.locationCity,
            enabled: data?.id,
            component: <ListPanel companyId={comId} apiPath="admin/customers-b2b/users" formFields={users} init={{}} />,
        },
    ];

    return <DetailsPage title={data?.id == null ? "Unos nove kompanije" : data?.name} fields={fields} />;
};

export default CompaniesDetails;
