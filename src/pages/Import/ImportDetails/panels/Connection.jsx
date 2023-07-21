import React, { useEffect, useState } from 'react';
import useAPI from '../../../../api/api';
import { toast } from 'react-toastify';
import Buttons from '../../../../components/shared/Form/Buttons/Buttons';
import Button from '../../../../components/shared/Button/Button';
import { rotateMatrix } from '../../../../helpers/data';
import Table from "../../../../components/shared/Table/Table";

import Check from "@mui/icons-material/Check";
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { InputSelect } from '../../../../components/shared/Form/FormInputs/FormInputs';
import { map } from 'lodash';

const Connection = ({ id, file }) => {
  const api = useAPI();
  const getImport = "admin/import/connect";
  const postImportExecute = "admin/import/execute";

  const [dataImport, setDataImport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOnSubmit, setIsLoadingOnSubmit] = useState(false);
  const [offset, setOffset] = useState(1);
  const [insert, setInsert] = useState(false);

  const [selectedTargets, setSelectedTargets] = useState([]);

  const [selectedConnection, setSelectedConnection] = useState(null);
  const [selectedImportSystem, setSelectedImportSystem] = useState(null);

  // The selected mapping by the user
  const [mapping, setMapping] = useState({})
  const updateMapping = (event, row) => {
    setMapping({ ...mapping, [event.target.name]: event.target.value })
    let obj = {
      [event.target.value]: row[0]
    };

    // let index = selectedTargets.findIndex((item) => item[event.target.value] === obj[event.target.value]);

    selectedTargets.map((item, i) => {
      console.log("Whole item:", item);
      console.log("Key:", event.target.value);
      console.log("Item::::", item[event.target.value]);
    })

    // console.log("Index:", index);

    setSelectedTargets([...selectedTargets, obj]);
  }

  const handleData = async () => {
    setIsLoading(true);
    api.put(`${getImport}/${id}`)
      .then((response) => {
        setDataImport(response?.payload);
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        setIsLoading(false);
      });
  };

  const submitHandler = (data) => {
    setIsLoadingOnSubmit(true);
    api.post(postImportExecute, data)
      .then((response) => {
        console.log(response)
        toast.success("Uspešno ste uvezli dokument!");
        setIsLoadingOnSubmit(false);
      })
      .catch((error) => {
        toast.error("Došlo je do greške prilikom uvoza dokumenta!");
        setIsLoadingOnSubmit(false);
      });
  };

  useEffect(() => {
    if (id) {
      handleData();
    }
  }, [id]);

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="16%">Poveži sa</TableCell>
            <TableCell width="28%">Prvi red</TableCell>
            <TableCell width="28%">Drugi red</TableCell>
            <TableCell width="28%">Treći red</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {dataImport && dataImport.preview && rotateMatrix(dataImport.preview).map((row, index) => {
            return (

              < TableRow key={index} >

                {/* The list of options to choose from */}
                <TableCell className="no-padding" >
                  <FormControl fullWidth size="small" style={{ padding: "5px 1em 5px 5px" }}>
                    <Select name={dataImport.skip_columns[index]} value={mapping[dataImport.skip_columns[index]] ?? ""} onChange={(event => updateMapping(event, row))} label=" ">
                      {dataImport.targets.map(key =>
                        <MenuItem key={key.id} value={key.id}>{key.name}</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </TableCell>

                {/* The extracted values, limited to 4 */}
                {
                  row.slice(0, 3).map((cell, index) => (
                    <TableCell key={index}>{cell}</TableCell>
                  ))
                }
              </TableRow>
            );
          })}

          {/*  Shown while loading */}
          {/* {setIsLoading && <LoadingTableRows columns="4" />} */}
        </TableBody >

      </Table >
      {file && (
        <Buttons styleWrapperButtons={{ alignItems: "end" }}>
          {/* Skip starting rows */}
          <InputSelect onChange={(res) => { const { target } = res; setSelectedConnection(target.value) }} value={selectedConnection} label="Preskoči redova" options={dataImport?.skip_columns} styleFormControl={{ width: "25%", marginBottom: "0" }} />
          {/* <InputSelect onChange={(res) => { const { target } = res; setSelectedImportSystem(target.value) }} value={selectedImportSystem} label="Import sistema" options={dataImport?.import_system} styleFormControl={{ width: "25%", marginRight: "auto", marginBottom: "0" }} /> */}

          <Button icon={<Check />} label={isLoading ? <CircularProgress size="1.5rem" /> : "Potvrdi uvoz"} onClick={submitHandler} variant="contained" />
        </Buttons>
      )
      }
    </>
  );
}

export default Connection;