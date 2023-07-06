import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Check from "@mui/icons-material/Check";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { toast } from "react-toastify";
import Button from "../../components/shared/Button/Button";
import Buttons from "../../components/shared/Form/Buttons/Buttons";
import LoadingTableRows from "../../components/shared/Loading/LoadingTableRows";
import Table from "../../components/shared/Table/Table";
import Loader from "../../components/shared/Loading/Loading";
import { rotateMatrix } from "../../helpers/data";
import useImportAPI from "./api";

/**
 * Show the available options for the
 *
 * @param {string} filename The name of the file.
 * @param {string} payload The base64 encoded file.
 *
 * @return {JSX.Element}
 * @constructor
 */
const ImportStep2 = ({ filename, payload }) => {
  const navigate = useNavigate()
  const api = useImportAPI()

  // Handle both error and success when uploading the file
  const [error, setError] = useState()
  const [response, setResponse] = useState()
  const { uuid, preview, targets, columns } = response?.payload ?? { preview: [], keys: [], options: [] }

  // The selected mapping by the user
  const [mapping, setMapping] = useState({})
  const updateMapping = event => setMapping({ ...mapping, [event.target.name]: event.target.value })

  // Send the file over the API
  useEffect(() => {
    api.putProductsImport(filename, payload)
      .then(setResponse)
      .catch(setError)
  }, [filename, payload])

  // Confirm import
  const [insert, setInsert] = useState(false)
  const [offset, setOffset] = useState(1)
  const [execute, setExecute] = useState(false)
  const onSubmit = () => {

    // Show loading
    setExecute(true)

    // Map
    const map = {}
    for (const column in mapping) {
      if (mapping.hasOwnProperty(column) && mapping[column] !== "") {
        map[mapping[column]] = {
          key: column
        }
      }
    }

    // Validate
    if (!map.code && !map.id) {
      toast.warning("Neophodno je odabrati jednu kolonu kao 'Jedinstveni broj' ili 'Šifra'")
      return setExecute(false)
    }
    if (!map.name) {
      toast.warning("Neophodno je odabrati jednu kolonu kao 'Naziv'")
      return setExecute(false)
    }

    // Send
    api.postProductsImportExecute(uuid, insert, offset, map)
      .catch(setError)
      .then(() => {
        setExecute(false)
        toast.success(`Proizvodi su unešeni uspešno`)
        navigate("/products")
      })
  }

  // Render: errors
  if (error) {
    return <h1>{response?.message ?? error.response.data.message}</h1>
  }

  // Render: table
  return <>
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
        {preview && rotateMatrix(preview).map((row, index) => (
          <TableRow key={index}>

            {/* The list of options to choose from */}
            <TableCell className="no-padding">
              <FormControl fullWidth size="small" style={{ padding: "5px 1em 5px 5px" }}>
                <Select name={columns[index]} value={mapping[columns[index]] ?? ""} onChange={updateMapping} label=" ">
                  <MenuItem value="">-</MenuItem>
                  {targets.map(key =>
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
        ))}

        {/*  Shown while loading */}
        {!response && <LoadingTableRows columns="4" />}

      </TableBody>
    </Table>

    {/* Do not show button until ready */}
    {response?.success && (
      <Buttons>

        {/* Create missing products */}
        <FormControl size="small">
          <FormLabel>Kreiraj nove proizvode</FormLabel>
          <Checkbox checked={insert} onChange={event => setInsert(event.target.checked)} />
        </FormControl>

        {/* Skip starting rows */}
        <FormControl size="small">
          <FormLabel>Preskoči redova</FormLabel>
          <Select value={offset} onChange={event => setOffset(event.target.value)}>
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        </FormControl>

        {/* Submit */}
        <Button icon={<Check />} label="Potvrdi uvoz" onClick={onSubmit} variant="contained" />
      </Buttons>
    )}

    {/* Execution is loading */}
    {execute && <Loader size={50} />}
  </>
}

export default ImportStep2
