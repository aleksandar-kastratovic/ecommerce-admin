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

import styles from "./GroupDetails.module.scss";
import formFields from "./formFields.json";

const CategoriesDetails = () => {
  const { gid, cid } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("info");
  const [detailsList, setDetailsList] = useState(listData);

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
    if (cid !== "new") {
      setSelected(slug);
    }
  };

  const onSubmit = (data) => {
    api
      .post(`admin/category_product/categories/`, data)
      .then((response) => {
        toast.success("Uspešno");
        if (cid === "new") navigate(-1);
        setData(response?.payload);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  useEffect(() => {
    if (cid !== "new") {
      api
        .get(`admin/category_product/categories/${gid}/${cid}`)
        .then((response) => {
          setData(response?.payload);
        })
        .catch((error) => {
          console.warn(error);
        });
    }
  }, []);

  const getDisplayed = () => {
    switch (selected) {
      case "info":
        return (
          <Form
            formFields={formFields}
            initialData={data}
            onSubmit={onSubmit}
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

export default CategoriesDetails;
