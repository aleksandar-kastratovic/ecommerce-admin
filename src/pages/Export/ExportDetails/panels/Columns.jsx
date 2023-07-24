import React, { useEffect, useState } from 'react';
import useAPI from '../../../../api/api';
import { toast } from 'react-toastify';
import { InputCheckbox } from '../../../../components/shared/Form/FormInputs/FormInputs';

const Columns = ({ data, file }) => {

  const api = useAPI();
  const apiPathExport = "admin/import/connect";

  const [dataModalContent, setDataModalContent] = useState([]);

  // const [dataExport, setDataExport] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState([]);

  // const handleData = async () => {
  //   setIsLoading(true);
  //   api.put(`${getImport}/${id}`)
  //     .then((response) => {
  //       setDataImport(response?.payload);
  //       console.log(dataImport)
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.warn(error);
  //       setIsLoading(false);
  //     });
  // };

  // const submitHandler = (data) => {
  //   setIsLoadingOnSubmit(true);
  //   api.post(postImportExecute, data)
  //     .then((response) => {
  //       console.log(response)
  //       toast.success("Uspešno ste uvezli dokument!");
  //       setIsLoadingOnSubmit(false);
  //     })
  //     .catch((error) => {
  //       toast.error("Došlo je do greške prilikom uvoza dokumenta!");
  //       setIsLoadingOnSubmit(false);
  //     });
  // };

  useEffect(() => {
    setDataModalContent(data);
  }, [data]);

  console.log(dataModalContent)

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setIsChecked((prevChecked) => [...prevChecked, name]);
    } else {
      setIsChecked((prevChecked) => prevChecked.filter((item) => item !== name));
    }
  };


  return (
    <>
      {/* <InputCheckbox onChange={handleCheckboxChange} key="{item.name}" name="{item.slug}" label="{item.name}" styleCheckbox={{ padding: "0 0.563rem 0 0.563rem" }} value="ruza"/> */}
      {/* {Array.isArray(dataModalContent) &&
        dataModalContent.map((item) => {
          const isCheckedItem = isChecked.includes(item.filename);
          return (<InputCheckbox onChange={handleCheckboxChange} key={item.filename} name={item.slug} label={item.filename} styleCheckbox={{ padding: "0 0.563rem 0 0.563rem" }} value={isCheckedItem} />);
        })} */}
    </>
  );
}

export default Columns;