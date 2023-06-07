import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAPI from "../../../api/api";
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import Form from "../../../components/shared/Form/Form";
import { toast } from "react-toastify";
import IconList from "../../../helpers/icons";
import ListPanel from "./panels/ListPanel";
import HeadOffice from "./panels/HeadOffice";
import basic_data from "./forms/basic_data.json";
import rebateFields from "./forms/rebate.json";
import contact from "./forms/contact.json";
import delivery_address from "./forms/delivery_address.json";
import notes from "./forms/notes.json";
import users from "./forms/users.json";
import AnalitycsData from "./panels/AnalitycsData";
import SalesOfficers from "./panels/SalesOfficers";
import UsersPanel from "./panels/UsersPanel";
import { getUrlQueryStringParam, setUrlQueryStringParam } from "../../../helpers/functions";

const CompaniesDetails = () => {
  const { comId } = useParams();
  const navigate = useNavigate();
  const activeTab = getUrlQueryStringParam("tab") ?? 'basic';

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
    let oldId = data.id;
    api.post(`${apiPath}/basic-data`, data)
      .then((response) => {
        setData(response?.payload);
        toast.success("Uspešno");

        if (oldId === null) {
          let tId = response?.payload?.id;
          navigate(`/b2b-companies/${tId}`, { replace: true });
        }
      })
      .catch((error) => {
        console.warn(error);
        toast.warn("Greška");
      });
  };

  const [rebate, setRebate] = useState({ rebate_tier_id: null });
  const loadRebate = () => {
    api.get(`${apiPath}/rebate/${comId}`)
      .then((response) => setRebate(response?.payload))
      .catch((error) => console.warn(error));
  };

  const saveRebate = (data) => {
    api.post(`${apiPath}/rebate/${comId}`, data)
      .then((response) => {
        setRebate(response?.payload);
        toast.success("Uspešno");
      })
      .catch((error) => {
        console.warn(error);
        toast.warn("Greška");
      });
  };

  useEffect(() => {
    handleData();
    loadRebate();
  }, []);

  const fields = [
    {
      id: "basic",
      name: "Osnovno",
      icon: IconList.dataThresholding,
      enabled: true,
      component: <Form formFields={basic_data} initialData={data} onSubmit={saveData} />,
    },
    {
      id: "location",
      name: "Sedište",
      icon: IconList.locationCity,
      enabled: data?.id,
      component: <HeadOffice companyId={data?.id} />,
    },
    {
      id: "delivery_address",
      name: "Adresa dostave",
      icon: IconList.locationCity,
      enabled: data?.id,
      component: (
        <ListPanel
          key="addr"
          companyId={data?.id}
          apiPath={`${apiPath}/delivery-address`}
          formFields={delivery_address}
          init={{
            id: null,
            id_company: data?.id,
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
      id: "contact",
      name: "Kontakt",
      icon: IconList.contactPage,
      enabled: data?.id,
      component: (
        <ListPanel
          key="cnt"
          companyId={data?.id}
          apiPath={`${apiPath}/contact`}
          formFields={contact}
          init={{ id: null, id_company: data?.id, type: null, first_name: null, last_name: null, phone: null, email: null, send_order_invoice_mail: null, note: null, status: null }}
        />
      ),
    },
    {
      id: "rebate",
      name: "Rabat",
      icon: IconList.percent,
      enabled: data?.id,
      component: <Form formFields={rebateFields} initialData={rebate} onSubmit={saveRebate} />,
    },
    {
      id: "analytics",
      name: "Analitika",
      icon: IconList.analytics,
      enabled: data?.id,
      component: <AnalitycsData companyId={data?.id} />,
    },
    {
      id: "notes",
      name: "Napomene",
      icon: IconList.note,
      enabled: data?.id,
      component: <ListPanel key="nap" companyId={data?.id} apiPath={`${apiPath}/notes`} formFields={notes} init={{ id: null, id_company: data?.id, title: null, description: null }} />,
    },
    {
      id: "commercialists",
      name: "Komercijalista",
      icon: IconList.person,
      enabled: data?.id,
      component: <SalesOfficers companyId={data?.id} />,
    },
    {
      id: "users",
      name: "Korisnici",
      icon: IconList.naturePeople,
      enabled: data?.id,
      component: (
        <UsersPanel
          key="user"
          companyId={data?.id}
          apiPath={`${apiPath}/users`}
          formFields={users}
          init={{ id: null, id_company: data?.id, first_name: null, last_name: null, email: null, phone: null, status: "on" }}
        />
      ),
    },
  ];

  // Handle after click on tab panel
  const panelHandleSelect = (field) => {
    let queryString = setUrlQueryStringParam("tab", field.id);
    const id = data.id == null ? "new" : data.id;
    navigate(`/b2b-companies/${id}?${queryString}`, { replace: true });
  }

  return <DetailsPage title={data?.id == null ? "Unos nove kompanije" : data?.name} fields={fields} selectedPanel={activeTab} panelHandleSelect={panelHandleSelect} />;
};

export default CompaniesDetails;
