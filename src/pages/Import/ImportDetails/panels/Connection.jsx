import React, { useEffect, useState } from 'react';
import useAPI from '../../../../api/api';
import { toast } from 'react-toastify';
import Buttons from '../../../../components/shared/Form/Buttons/Buttons';
import Button from '../../../../components/shared/Button/Button';
import { rotateMatrix } from '../../../../helpers/data';
import Table from "../../../../components/shared/Table/Table";

import Check from "@mui/icons-material/Check";
import CircularProgress from '@mui/material/CircularProgress';
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import FormControlLabel from '@mui/material/FormControlLabel';
import LoadingTableRows from '../../../../components/shared/Loading/LoadingTableRows';

const Connection = ({ id, file }) => {

  console.log("id", id)

  const api = useAPI();
  const getImport = "admin/import/connect";
  const postImportExecute = "admin/products/import/execute";

  const [dataImport, setDataImport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOnSubmit, setIsLoadingOnSubmit] = useState(false);
  const [offset, setOffset] = useState(1);
  const [insert, setInsert] = useState(false);

  // The selected mapping by the user
  const [mapping, setMapping] = useState({})
  const updateMapping = event => setMapping({ ...mapping, [event.target.name]: event.target.value })

  const handleData = async () => {
    setIsLoading(true);
    api.put(`${getImport}/${id}`)
      .then((response) => {
        setDataImport(response?.payload);
        console.log(dataImport)
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
            console.log(index)
            return (

              < TableRow key={index} >

                {/* The list of options to choose from */}
                < TableCell className="no-padding" >
                  <FormControl fullWidth size="small" style={{ padding: "5px 1em 5px 5px" }}>
                    <Select name={dataImport.columns[index]} value={mapping[dataImport.columns[index]] ?? ""} onChange={updateMapping} disabled label=" ">
                      <MenuItem value="">-</MenuItem>
                      {dataImport.targets.map(key =>
                        <MenuItem key={key.code} value={key.code}>{key.name}</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </TableCell>

                {/* The extracted values, limited to 4 */}
                {row.slice(0, 3).map((cell, index) => (
                  <TableCell key={index}>{cell}</TableCell>
                ))}
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
          <FormControl sx={{ marginRight: "2rem", width: "15%" }} >
            <FormLabel>Preskoči redova</FormLabel>
            <Select
              value={offset}
              onChange={event => setOffset(event.target.value)}
              sx={{
                "& .MuiSelect-select": {
                  padding: "0.469rem 0.875rem"
                }
              }}
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </FormControl>

          <FormControlLabel
            control={<Checkbox checked={insert} onChange={event => setInsert(event.target.checked)} />} label="Kreiraj nove proizvode" sx={{ "& .MuiCheckbox-root": { padding: "0", paddingRight: "0.3rem" }, marginRight: "auto", "& .MuiFormControlLabel-label": { color: "rgba(0, 0, 0, 0.6)" } }}
          />

          {/* <Button icon={<Check />} label={isLoadingOnSubmit ? <CircularProgress size="1.5rem" /> : "Uvezi dokument"} onClick={() => submitHandler({ offset: offset })} variant="contained" /> */}
          <Button icon={<Check />} label={isLoading ? <CircularProgress size="1.5rem" /> : "Potvrdi uvoz"} onClick={submitHandler} variant="contained" />
        </Buttons>
      )}
    </>
  );
}

export default Connection;