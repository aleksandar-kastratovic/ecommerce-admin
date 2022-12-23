import NoteBox from "../../components/shared/NoteBox/NoteBox"

/**
 * Show an upload form for the import file.
 *
 * @param {*} fileInputRef The value of the useFileInput() hook.
 *
 * @return {JSX.Element}
 * @constructor
 */
const ImportStep1 = ({ fileInputRef }) => (
  <label className="wide clickable">
    <NoteBox message="Kliknite ovde kako biste odabrali fajl za import." />

    <input ref={fileInputRef} type="file" style={{ display: "none" }} />
  </label>
)

export default ImportStep1
