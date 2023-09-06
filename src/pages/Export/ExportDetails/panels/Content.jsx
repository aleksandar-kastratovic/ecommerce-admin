import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Buttons from '../../../../components/shared/Form/Buttons/Buttons';
import Button from '../../../../components/shared/Button/Button';
import { rotateMatrix } from '../../../../helpers/data';
import Table from "../../../../components/shared/Table/Table";

import Check from "@mui/icons-material/Check";
import CircularProgress from '@mui/material/CircularProgress';
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import AuthContext from '../../../../store/auth-contex';

const Content = ({ id, file }) => {

  const authCtx = useContext(AuthContext);
  const { api } = authCtx;
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
            <TableCell width="33.33%">Prvi red</TableCell>
            <TableCell width="33.33%">Drugi red</TableCell>
            <TableCell width="33.33%">Treći red</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {dataImport && dataImport.preview && rotateMatrix(dataImport.preview).map((row, index) => {
            console.log(index)
            return (

              <TableRow key={index}>

                {/* The extracted values, limited to 4 */}
                {row.slice(0, 3).map((cell, index) => (
                  <TableCell key={index} sx={{ padding: "0.7rem 0.875rem !important" }}>{cell}</TableCell>
                ))}
              </TableRow>
            );
          })}

          {/*  Shown while loading */}
          {/* {!response && <LoadingTableRows content="4" />} */}
        </TableBody >

      </Table >
      {file && (
        <Buttons styleWrapperButtons={{ alignItems: "end" }}>
          {/* <Button icon={<Check />} label={isLoadingOnSubmit ? <CircularProgress size="1.5rem" /> : "Uvezi dokument"} onClick={() => submitHandler({ offset: offset })} variant="contained" /> */}
          <Button icon={<Check />} label={isLoading ? <CircularProgress size="1.5rem" /> : "Potvrdi izvoz"} onClick={submitHandler} variant="contained" />
        </Buttons>
      )}
    </>
  );
}

export default Content;