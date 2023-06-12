import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import Button from "../../../../components/shared/Button/Button";
import Buttons from "../../../../components/shared/Form/Buttons/Buttons";
import SearchableListForm from "../../../../components/shared/Form/SearchableListForm/SearchableListForm";
import Loading from "../../../../components/shared/Loading/Loading";

const SalesOfficers = ({ companyId }) => {
  const [listData, setListData] = useState([]);

  const [isLoading, setIsLoading] = useState([]);

  const navigate = useNavigate();

  const api = useAPI();
  const apiPath = "admin/customers-b2b/sales-officer";

  const handleList = () => {
    setIsLoading(true);
    api.get(`${apiPath}/${companyId}`)
      .then((response) => {
        setListData(response?.payload);
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        setIsLoading(false);
      });
  };

  const handleSubmit = (data) => {
    api.post(apiPath, { id_company: companyId, id_sales_officers: data })
      .then((response) => {
        toast.success("Uspešno");
      })
      .catch((error) => {
        console.warn(error);
        toast.warn("Greška");
      });
  };

  useEffect(() => {
    handleList();
  }, []);

  return !isLoading ? (
    <>
      <Buttons>
        <Button label="Komercijalisti" variant="contained" onClick={() => navigate("/b2b-sales-officers")} />
      </Buttons>
      <SearchableListForm available={listData.available} selected={listData.selected} onSubmit={handleSubmit} />
    </>
  ) : (
    <Loading />
  );
};

export default SalesOfficers;
