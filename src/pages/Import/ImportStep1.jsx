import { useRef } from "react";
import DetailsBasic from "../../components/shared/Layout/Details/DetailsBasic/DetailsBasic";

/** Show an upload form for the import file. */
const ImportStep1 = () => {

  // Handle uploaded file
  const inputElement = useRef();
  inputElement.current?.addListener

  return (
    <DetailsBasic title="Import kataloga">
      <label className="clickable">
        Kliknite ovde kako biste odabrali fajl za import
        <input ref={inputElement} type="file" style={{ display: "none" }} />
      </label>
    </DetailsBasic>
  );
};

export default ImportStep1;