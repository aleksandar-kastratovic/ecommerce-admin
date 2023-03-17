import ListPage from "../../../../../components/shared/ListPage/ListPage";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../../api/api";
import SearchableListForm from "../../../../../components/shared/Form/SearchableListForm/SearchableListForm";
import CampaignTable from "../CampaignTable/CampaignTable";


const SelectionModal = ({ openDialog, setOpenDialog, selectedValues, component, opt, options, setOptions }) => {

  const handleList = () => {
    // api.get(`${apiPath}/row/ddl/value`)
    //   .then((response) => {
    //     setListData(response?.payload);
    //   })
    //   .catch((error) => {
    //     console.warn(error);
    //   });
  };

  const onSubmit = (selected) => {
    //proslediti izabrane id-eve na api ili roditeljskun komponentu
    // api.post(apiPath, selected)
    //   .then((response) => {
    //     toast.success("Uspešno");
    //   })
    //   .catch((error) => {
    //     console.warn(error);
    //     toast.warn("Greška");
    //   });
    console.log(selected);
  }

  // useEffect(() => {
  //   handleList();
  // }, []);

  const ComponentToRender = () => {
    switch (component) {
      case "list": return <SearchableListForm
        available={opt?.available}
        selected={opt?.selected}
        onSubmit={onSubmit}
      />;
      case "table": return <CampaignTable data={opt?.data} columns={opt?.format} options={options} setOptions={setOptions}/>;

      default: return null;
    }
  }

  return <Dialog open={openDialog.show ?? false}>
    <DialogContent>
      <p>{selectedValues}</p>
      {opt && ComponentToRender()}
    </DialogContent>

    <DialogActions>
      <Button variant="outlined" onClick={() => setOpenDialog({ ...openDialog, show: false })} data-test-id="btn-cancel">
        Zatvori
      </Button>
    </DialogActions>
  </Dialog>
}

export default SelectionModal;