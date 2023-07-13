import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const Export = () => {

  const customActions = {
    delete: {
      type: "delete",
      display: false,
    },
    edit: {
      type: "edit",
      display: false,
    },
    download: {
      type: "custom",
      display: true,
      position: 2,
      icon: "download",
      title: "Preuzmite dokument",
      clickHandler: {
        type: '',
        fnc: (rowData) => {
          const fileId = rowData.file;
          window.open(`${fileId}`, "_blank");
        },
      },
    },
  };

  return (
    <ListPage
      listPageId="Export"
      apiUrl="admin/import/list"
      title="Izvoz podataka iz fajla"
      columnFields={tblFields}
      customActions={customActions}
    />
  )
};

export default Export;
