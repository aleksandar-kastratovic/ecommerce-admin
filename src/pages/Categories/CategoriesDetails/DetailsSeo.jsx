import { useState } from "react";
import List from "../../../components/shared/ListAdder/List";

const DetailsSeo = () => {
  const [listData, setListData] = useState([]);

  return <List listFields={listData} init={{}} onSave={() => {}} onDelete={() => {}} />;
};

export default DetailsSeo;
