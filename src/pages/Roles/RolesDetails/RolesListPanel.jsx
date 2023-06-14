import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../api/api";
import SearchableListForm from "../../../components/shared/Form/SearchableListForm/SearchableListForm";
import Loading from "../../../components/shared/Loading/Loading";

const RolesListPanel = ({ roleId }) => {
  const [listData, setListData] = useState([]);
  const [isLoadingOnSubmit, setIsLoadingOnSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState([]);

  const api = useAPI();
  const apiPath = "admin/roles/screens";

  const handleList = () => {
    setIsLoading(true);
    api.get(`${apiPath}/${roleId}`)
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
    setIsLoadingOnSubmit(true);
    api.post(apiPath, { role_id: roleId, screen_ids: data })
      .then((response) => {
        toast.success("Uspešno");
        setIsLoadingOnSubmit(false);
      })
      .catch((error) => {
        console.warn(error);
        toast.warn("Greška");
        setIsLoadingOnSubmit(false);
      });
  };

  useEffect(() => {
    handleList();
  }, []);

  return !isLoading ? <SearchableListForm available={listData.available} selected={listData.selected} onSubmit={handleSubmit} isLoading={isLoadingOnSubmit} /> : <Loading />;
};

export default RolesListPanel;
