import { Box } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DetailsBasic from "../../../components/shared/Layout/Details/DetailsBasic/DetailsBasic";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import DetailsList from "./DetailsList";
import { toast } from "react-toastify";
import listData from "./DetailsListData.json";
import TwoColumnDetails from "../../../components/shared/Layout/Details/TwoColumnDetails/TwoColumnDetails";
import Form from "../../../components/shared/Form/Form";
import useAPI from "../../../api/api";
import List from "../../../components/shared/ListAdder/List";

import styles from "./GroupDetails.module.scss";
import basic_data from "./forms/basic_data.json";
import head_office from "./forms/head_office_address.json";
import contact from "./forms/contact.json";
import delivery_address from "./forms/delivery_address.json";
import notes from "./forms/notes.json";
import sales from "./forms/sales_officer.json";
import users from "./forms/users.json";

const multi = [
  "contact",
  "notes",
  "sales_officer",
  "users",
  "delivery_address",
];

const CompaniesDetails = () => {
  const { comId } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("basic_data");
  const [detailsList, setDetailsList] = useState(listData);
  const [salesDdl, setSalesDdl] = useState([]);

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
  const [isLoading, setIsLoading] = useState(false);
  const api = useAPI();

  const handleBackToList = () => {
    navigate(-1);
  };

  const handleSelectInDetails = (module, slug) => {
    if (comId !== "new") {
      setSelected(slug);
    }
  };

  const onSubmit = (data) => {
    api
      .post(`admin/customers-b2b/${selected}`, {
        id: null,
        type: "head_office",
        id_company: comId,
        order: 0,
        ...data,
      })
      .then((response) => {
        toast.success("Uspešno");
        if (comId === "new") navigate(-1);
        if (multi.includes(selected)) {
          handleGetList();
        } else {
          setData(response?.payload);
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const handleGetList = () => {
    api
      .list(`admin/customers-b2b/${selected}/${comId}`)
      .then((response) => {
        setData(response?.payload?.items);
      })
      .catch((error) => {
        console.warn(error);
        setData([]);
      });
  };

  const onDelete = (token, id) => {
    api
      .delete(`admin/customers-b2b/${selected}/${comId}/${id}`)
      .then((response) => {
        handleGetList();
        toast.success("Uspešno obrisano");
      })
      .catch((error) => console.warn(error));
  };

  useEffect(() => {
    if (comId !== "new") {
      if (multi.includes(selected)) {
        handleGetList();
      } else {
        api
          .get(`admin/customers-b2b/${selected}/${comId}`)
          .then((response) => {
            setData(response?.payload);
          })
          .catch((error) => {
            console.warn(error);
          });
      }
    }
  }, [selected]);

  useEffect(() => {
    if (selected === "sales_officer") {
      api
        .get(`admin/customers-b2b/sales_officer/ddl/id_sales_officer`)
        .then((response) => {
          setSalesDdl(response?.payload);
        })
        .catch((error) => {
          setSalesDdl([]);
        });
    }
  }, [selected]);

  const getDisplayed = () => {
    switch (selected) {
      case "basic_data":
        return (
          <Form
            key="basic_data"
            formFields={basic_data}
            initialData={data}
            onSubmit={onSubmit}
          />
        );
      case "head-office-address":
        return (
          <Form
            key="head_office_address"
            formFields={head_office}
            initialData={data}
            onSubmit={onSubmit}
          />
        );
      case "delivery_address":
        return (
          <List
            key="delivery_address"
            formFields={delivery_address}
            listFields={data}
            onSave={onSubmit}
            onDelete={onDelete}
          />
        );
      case "contact":
        return (
          <List
            key="contact"
            formFields={contact}
            listFields={data}
            onSave={onSubmit}
            onDelete={onDelete}
          />
        );
      case "notes":
        return (
          <List
            key="notes"
            formFields={notes}
            listFields={data}
            onSave={onSubmit}
            onDelete={onDelete}
          />
        );
      case "sales_officer":
        let form = [];

        for (const item of sales) {
          if (item.prop_name === "id_sales_officer") {
            form.push({ ...item, options: salesDdl });
          } else {
            form.push(item);
          }
        }

        return (
          <List
            key="sales_officer"
            formFields={form}
            listFields={data}
            onSave={onSubmit}
            onDelete={onDelete}
          />
        );
      case "users":
        return (
          <List
            key="users"
            formFields={users}
            listFields={data}
            onSave={onSubmit}
            onDelete={onDelete}
          />
        );
      default:
        return <p>Došlo je do greške! Molimo pokušajte kasnije.</p>;
    }
  };

  return (
    <>
      <Box className={styles.details}>
        <DetailsBasic
          handleBackToList={handleBackToList}
          list={
            <DetailsList
              selected={selected}
              detailsList={detailsList}
              handleSelectInDetails={handleSelectInDetails}
              isLoadingList={false}
              isErrorList={false}
            />
          }
          main={
            <TwoColumnDetails
              middle={
                <>
                  {!isLoading ? (
                    getDisplayed()
                  ) : (
                    <Stack spacing={1}>
                      <Skeleton variant="text" height={60} />
                      <Skeleton variant="text" height={60} />
                      <Stack spacing={1}>
                        <Skeleton variant="text" />
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton
                          variant="rectangular"
                          width={210}
                          height={118}
                        />
                      </Stack>
                      <Skeleton variant="text" height={60} />
                    </Stack>
                  )}
                </>
              }
              hasButton={false}
              buttonText="Sacuvaj"
            />
          }
        />
      </Box>
    </>
  );
};

export default CompaniesDetails;
