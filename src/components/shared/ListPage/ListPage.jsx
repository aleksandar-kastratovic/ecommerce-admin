import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { toast } from "react-toastify";
import ListTable from "../ListTable/ListTable";
import ListTableToolbar from "../ListTable/ListTableToolbar";
import DeleteDialog from "../Dialogs/DeleteDialog";
import PageWrapper from "../Layout/PageWrapper/PageWrapper";
import { flatten } from "lodash";
import { useQuery } from "react-query";
import useAPI from "../../../api/api";
import ModalForm from "../Modal/ModalForm";
import ButtonRef from "../Button/ButtonRef";
import CustomTooltipRef from "../CustomTooltipRef/CustomTooltipRef";


/**
 * Show a standardized list.
 *
 * @param {string} apiUrl
 * @param {?string} deleteUrl
 * @param {?string} editUrl
 * @param {string} title
 * @param {FieldSpec[]} columnFields
 * @param {FieldSpec[]} filters
 * @param {[]} additionalButtons
 * @param {boolean} showDatePicker
 * @param {boolean} showNewButton
 * @param {function(*[]): []} modifyItems The function that accepts the items and return modified ones.
 * @param {Object} filters Additional filters for list api
 * @param {string default:"id"} error Column value that is sent to preview page
 * @param {Object{type: {handler:function, icon: ""}}} customActions 
 * @param {boolean} showAddButtonTableRow Add a button "add row" to the table (if needed in the future).
 * @param {string} tooltipAddButtonTableRow Add title to tooltip (if needed in the future).
 * @param {string} addFieldLabel Name of the button.
 * @param {boolean} showAddButton By default, the button is hidden. If we pass true, button will be shown below the table.
 * 
 *
 * @constructor
 */
const ListPage = ({ apiUrl, deleteUrl, editUrl, editUrlQueryString = [], title, columnFields, showDatePicker, modifyItems, additionalButtons = [], showNewButton = true, actionNewButton, filters = {}, previewColumn = "id", customActions = {}, showAddButtonTableRow, tooltipAddButtonTableRow, addFieldLabel = "", showAddButton = false, initialData = {}, modalFormChildren, deleteNewButton, deleteModalChildren, listPageId, validateData, onNewButtonPress = () => { }, prepareInitialData, withoutSetterFunction, submitButtonForm, clearButton, customTitleModalForm, modalObject, customTitleDataNameForEditModal, selectableCountryTown, useColumnFields = false, useModalGalleryInjection = false }) => {
  // TODO Sorting is disabled as it does not work with pagination
  columnFields = columnFields.map((field) => ({ ...field, sortable: false }));

  const showAddButtonRef = useRef(null);

  const api = useAPI();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [fieldsColumns, setFieldsColumns] = useState(columnFields);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [deleteModalData, setDeleteModalData] = useState({});

  const [openModal, setOpenModal] = useState({ show: false, id: null });

  // Default delete URL is the same as the main URL
  deleteUrl = deleteUrl ?? apiUrl;

  editUrl = editUrl ?? apiUrl;

  // Handle delete dialog
  const [openDeleteDialog, setOpenDeleteDialog] = useState({ show: false, id: null, mutate: null });

  const [selectedRowData, setSelectedRowData] = useState({});
  const [selectedActionsButton, setSelectedActionsButton] = useState({});

  // Load the data
  const { data: response, isLoading, isError } = useQuery(["openDeleteDialog.mutate", openDeleteDialog.mutate, search, page, openModal.show], () => api.list(apiUrl, { page, search, ...filters }));

  // Modify the data
  if (response?.payload && modifyItems) {
    response.payload.items = modifyItems(response.payload.items);
  }

  useEffect(() => {
    if (openDeleteDialog.mutate === 1) {
      setOpenDeleteDialog({ show: false, id: null, mutate: 0 });
    }
  }, [openDeleteDialog.mutate]);

  useEffect(() => {
    if (isError) {
      toast.warning("Greška");
    }
  }, [isError]);



  // Update the search term and reset to the first page
  const handleSearch = (value) => {
    // TODO This always triggers two request as we are changing two states in a row
    setPage(1);
    setSearch(value);
  };

  const handleDeleteModalData = (data) => {
    setDeleteModalData(data);
    return data;
  };

  const handleOnClickActions = (id, type, rowData, inputOpts = {}) => () => {
    setSelectedRowData(rowData);
    setSelectedActionsButton(inputOpts);

    if (inputOpts?.clickHandler) {
      switch (inputOpts.clickHandler.type) {
        case "navigate":
          let navigate_path = inputOpts.clickHandler.fnc(rowData);
          navigate(navigate_path);
          break;
        case "dialog_delete":
          let dialog_delete_opt = inputOpts.clickHandler.fnc(rowData, handleDeleteModalData);
          if (dialog_delete_opt) {
            setOpenDeleteDialog(dialog_delete_opt);
          }
          break;
        case "modal_form":
          let modal_form_opt = inputOpts.clickHandler.fnc(rowData);
          if (modal_form_opt) {
            setOpenModal(modal_form_opt);
          }
          break;
        default:
          inputOpts.clickHandler.fnc(rowData);
          break;
      }
    } else {
      switch (type) {
        case "edit":
          if (actionNewButton === "modal") {
            setOpenModal({ show: true, id: id });
          } else {
            navigate(`${pathname}/${id}`);
          }
          break;
        case "preview":
          navigate(`${pathname}/${id}`);
          break;
        case "delete":
          if (deleteNewButton === "modal") {
            setOpenModal({ show: true, id: id });
          } else {
            setOpenDeleteDialog({ show: true, id: id, mutate: null });
          }
          break;
      }
    }

  };

  const handleDeleteConfirm = async () => {

    if (selectedActionsButton?.deleteClickHandler) {
      switch (selectedActionsButton.deleteClickHandler.type) {
        case "navigate":
          let navigate_path = selectedActionsButton.deleteClickHandler.fnc(selectedRowData);
          navigate(navigate_path);
          break;
        case "dialog_delete":
          let dialog_delete_opt = selectedActionsButton.deleteClickHandler.fnc(selectedRowData, deleteModalData);
          setOpenDeleteDialog(dialog_delete_opt);
          break;
        case "modal_form":
          let modal_form_opt = selectedActionsButton.deleteClickHandler.fnc(selectedRowData);
          setOpenModal(modal_form_opt);
          break;
        default:
          selectedActionsButton.deleteClickHandler.fnc(selectedRowData);
          break;
      }
    } else {
      api.delete(`${deleteUrl}/${openDeleteDialog.id}`)
        .then(() => toast.success("Zapis je uspešno obrisan"))
        .catch(() => toast.warning("Došlo je do greške prilikom brisanja"));

      setOpenDeleteDialog({ show: false, id: null, mutate: 1 });
    }
  };

  // Buttons in the page header
  const actions = [...additionalButtons] ?? [];
  if (showNewButton) {
    actions.push({
      label: "Novi unos",
      action: () => {
        if (actionNewButton === "modal") {
          onNewButtonPress();
          setOpenModal({ show: true, id: "new" });
        } else {
          navigate("new");
        }
      },
      variant: "contained",
      icon: "add",
    });
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      const keyCode = event.keyCode;
      const shiftPress = event.shiftKey ? event.shiftKey : keyCode === 16 ? true : false;
      const ctrlPress = event.ctrlKey ? event.ctrlKey : keyCode === 17 ? true : false;

      // shift + space => open model from right side
      // 32 => "Space"
      if (showAddButton && shiftPress && keyCode === 32) {
        setOpenModal({ show: true, id: "new" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <PageWrapper title={title} actions={actions}>
        <ListTableToolbar listPageId={listPageId} onColumnsChange={setFieldsColumns} fields={fieldsColumns} filters={filters} onSearch={handleSearch} showDatePicker={showDatePicker} />

        <ListTable
          fields={flatten(fieldsColumns).filter((field) => field.in_main_table)}
          listData={response?.payload}
          handleOnClickActions={handleOnClickActions}
          isLoading={isLoading}
          page={page}
          onPageChange={setPage}
          previewColumn={previewColumn}
          showAddButtonTableRow={showAddButtonTableRow}
          tooltipAddButtonTableRow={tooltipAddButtonTableRow}
          customActions={customActions}
        />

        {showAddButton && (
          <CustomTooltipRef title="Prečica: SHIFT + SPACE" placement="top" arrow>
            < ButtonRef ref={showAddButtonRef} onClick={() => setOpenModal({ show: true, id: "new" })} label={addFieldLabel} icon="add" sx={{ display: "flex", margin: "0 auto", marginTop: "2rem", textTransform: "inherit" }} />
          </CustomTooltipRef>
        )}


      </PageWrapper >

      <ModalForm validateData={validateData} children={modalFormChildren} selectedRowData={selectedRowData} anchor="right" openModal={openModal} setOpenModal={setOpenModal} apiPathFormModal={editUrl} queryString={editUrlQueryString} formFields={useColumnFields ? flatten(columnFields).filter((field) => field.in_details) : flatten(fieldsColumns).filter((field) => field.in_details)} initialData={initialData} sx={{ padding: "2rem" }} prepareInitialData={prepareInitialData} withoutSetterFunction={withoutSetterFunction} submitButton={submitButtonForm} clearButton={clearButton} customTitle={customTitleModalForm} modalObject={modalObject} customTitleDataNameForEdit={customTitleDataNameForEditModal} selectableCountryTown={selectableCountryTown} useModalGalleryInjection={useModalGalleryInjection} />
      <DeleteDialog children={deleteModalChildren} selectedRowData={selectedRowData} handleConfirm={handleDeleteConfirm} openDeleteDialog={openDeleteDialog} setOpenDeleteDialog={setOpenDeleteDialog} />
    </>
  );
};

export default ListPage;
