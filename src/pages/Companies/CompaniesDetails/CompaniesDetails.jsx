import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useAPI from "../../../api/api";
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import Form from "../../../components/shared/Form/Form";
import { toast } from "react-toastify";
import IconList from "../../../helpers/icons";

import ListPanel from "./panels/ListPanel";
import HeadOffice from "./panels/HeadOffice";

import basic_data from "./forms/basic_data.json";
import contact from "./forms/contact.json";
import delivery_address from "./forms/delivery_address.json";
import notes from "./forms/notes.json";
import sales from "./forms/sales_officer.json";
import users from "./forms/users.json";

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
    const apiPath = "admin/customers-b2b";

    const handleData = () => {
        api.get(`${apiPath}/basic-data/${comId}`)
            .then((response) => setData(response?.payload))
            .catch((error) => console.warn(error));
    };

    const saveData = (data) => {
        api.post(`${apiPath}/basic-data`, data)
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
            component: (
                <ListPanel
                    key="addr"
                    companyId={comId}
                    apiPath="${apiPath}/delivery-address"
                    formFields={delivery_address}
                    init={{
                        id: null,
                        id_company: null,
                        name: null,
                        address: null,
                        object_number: null,
                        floor: null,
                        apartment_number: null,
                        id_town: null,
                        town_name: null,
                        zip_code: null,
                        municipality_name: null,
                        id_country: null,
                        country_name: null,
                        note: null,
                    }}
                />
            ),
        },
        {
            name: "Kontakt",
            icon: IconList.contactPage,
            enabled: data?.id,
            component: (
                <ListPanel
                    key="cnt"
                    companyId={comId}
                    apiPath="${apiPath}/contact"
                    formFields={contact}
                    init={{ id: null, id_company: null, type: null, first_name: null, last_name: null, phone: null, email: null, send_order_invoice_mail: null, note: null, status: null }}
                />
            ),
        },
        {
            name: "Analitika",
            icon: IconList.analytics,
            enabled: data?.id,
            component: <div>Analitika</div>,
        },
        {
            name: "Napomene",
            icon: IconList.note,
            enabled: data?.id,
            component: <ListPanel key="nap" companyId={comId} apiPath={`${apiPath}/notes`} formFields={notes} init={{}} />,
        },
        {
            name: "Komercijalista",
            icon: IconList.person,
            enabled: data?.id,
            component: <ListPanel key="komerc" companyId={comId} apiPath={`${apiPath}/sales_officer`} formFields={sales} init={{}} />,
        },
        {
            name: "Korisnici",
            icon: IconList.naturePeople,
            enabled: data?.id,
            component: <ListPanel key="user" companyId={comId} apiPath={`${apiPath}/users`} formFields={users} init={{}} />,
        },
    ];

    return <DetailsPage title={data?.id == null ? "Unos nove kompanije" : data?.name} fields={fields} />;
};

export default CompaniesDetails;
