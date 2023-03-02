import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";
import { InputCheckbox } from "../../../../../components/shared/Form/FormInputs/FormInputs";
import SearchableListForm from "../../../../../components/shared/Form/SearchableListForm/SearchableListForm";

//DELETE demo data
import demo from "./demo_data.json";

const SelectionModal = ({ openDialog, setOpenDialog, apiPath, data, selectedValues }) => {

  console.log(selectedValues)
  const onSubmit = (selected) => {
    //proslediti izabrane id-eve na api ili roditeljskun komponentu
    console.log(selected);
  }
  /*
    = - jednako jednoj vrednosti "selec ili text"
    IN - jednak je jednom ili vise iz neke liste "multichoice ili searchableform"
    <= - manje ili jednako
    >= - veće ili jednako
    <> - različito
    BETWEEN - izmedju dve vrednosti - moze se resiti sa dva reda sa >= i <=
    LIKE - sličan sa nekim - npr sifra

    Za value bi bilo potrebno - tip polja (unos, izbor jedne vrednosti ili vise vrednosti) 
                              -i tip vrednosti (ako je polje za unos da li je broj ili string)
    {
      type:"select",
      value:"number"
    }
  */

  return <Dialog open={openDialog.show ?? false}>
    <DialogContent>
      <p>{selectedValues}</p>
      <SearchableListForm
        available={demo.available}
        selected={demo.selected}
        onSubmit={onSubmit}
      />

    </DialogContent>

    <DialogActions>
      <Button variant="outlined" onClick={() => setOpenDialog({ ...openDialog, show: false })} data-test-id="btn-cancel">
        Zatvori
      </Button>
    </DialogActions>
  </Dialog>
}

export default SelectionModal;