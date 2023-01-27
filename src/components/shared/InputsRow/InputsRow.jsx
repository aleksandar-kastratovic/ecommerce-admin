import { useState } from "react";
import { Icon, Table, TableBody, TableCell, TableRow, TableFooter } from "@mui/material";
import { InputCheckbox, InputHtml, InputSelect } from "../../../components/shared/Form/FormInputs/FormInputs";
import Button from "../../../components/shared/Button/Button";
import Buttons from "../../../components/shared/Form/Buttons/Buttons";
import IconButton from "@mui/material/IconButton";

import styles from "./InputsRow.module.scss";

const InputsRow = () => {
    // const [numInputs, setNumInputs] = useState(1);

    // const handleAddInput = () => {
    //     setNumInputs(numInputs + 1);
    // }

    // console.log(Array(numInputs))

    // const inputs = Array(numInputs)
    //     .fill()
    //     .map((_, i) => <input key={i} placeholder={`Input ${i + 1}`} />);

    const [divs, setDivs] = useState([]);
    const [counter, setCounter] = useState(1);

    const handleClick = () => {
        setDivs([...divs, <div key={divs.length}>dasd</div>]);
        setCounter(counter + 1);
    };

    return (
        // <Box>
        //     <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        //         <Box gridColumn="span 3">
        //             <InputSelect
        //                 label=""
        //                 required={false}
        //                 name="status"
        //                 // value={data.status ?? ""}
        //                 // onChange={({ target }) => {
        //                 //     setData({ ...data, [target.name]: target.value });
        //                 // }}
        //                 // fillFromApi={`${apiPath}/ddl`}
        //                 usePropName={true}
        //                 options={[]}
        //             />
        //         </Box>
        //         <Box gridColumn="span 3">
        //             <InputSelect
        //                 label=""
        //                 required={false}
        //                 name="status"
        //                 // value={data.status ?? ""}
        //                 // onChange={({ target }) => {
        //                 //     setData({ ...data, [target.name]: target.value });
        //                 // }}
        //                 // fillFromApi={`${apiPath}/ddl`}
        //                 usePropName={false}
        //                 options={[]}
        //             />
        //         </Box>
        //         <Box gridColumn="span 3">
        //             <InputSelect
        //                 label=""
        //                 required={false}
        //                 name="status"
        //                 // value={data.status ?? ""}
        //                 // onChange={({ target }) => {
        //                 //     setData({ ...data, [target.name]: target.value });
        //                 // }}
        //                 // fillFromApi={`${apiPath}/ddl`}
        //                 usePropName={false}
        //                 options={[]}
        //             />
        //         </Box>
        //         <Box gridColumn="span 3">
        //             <InputSelect
        //                 label=""
        //                 required={false}
        //                 name="status"
        //                 // value={data.status ?? ""}
        //                 // onChange={({ target }) => {
        //                 //     setData({ ...data, [target.name]: target.value });
        //                 // }}
        //                 // fillFromApi={`${apiPath}/ddl`}
        //                 usePropName={false}
        //                 options={[]}
        //             />
        //         </Box>
        //     </Box>

        //     {/* <div>
        //         {inputs}
        //         <button onClick={handleAddInput}>Add Input</button>
        //     </div> */}
        //     <div>
        //         <button onClick={handleClick}>Add</button>
        //         {divs}
        //     </div>
        // </Box>
        <>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{ visibility: 'hidden' }}>empty</TableCell>
                        <TableCell>
                            <InputSelect
                                label=""
                                required={false}
                                name="status"
                                // value={data.status ?? ""}
                                // onChange={({ target }) => {
                                //     setData({ ...data, [target.name]: target.value });
                                // }}
                                // fillFromApi={`${apiPath}/ddl`}
                                usePropName={false}
                                options={[]}
                            />
                        </TableCell>
                        <TableCell>
                            <InputSelect
                                label=""
                                required={false}
                                name="status"
                                // value={data.status ?? ""}
                                // onChange={({ target }) => {
                                //     setData({ ...data, [target.name]: target.value });
                                // }}
                                // fillFromApi={`${apiPath}/ddl`}
                                usePropName={false}
                                options={[]}
                            />
                        </TableCell>
                        <TableCell>
                            <InputSelect
                                label=""
                                required={false}
                                name="status"
                                // value={data.status ?? ""}
                                // onChange={({ target }) => {
                                //     setData({ ...data, [target.name]: target.value });
                                // }}
                                // fillFromApi={`${apiPath}/ddl`}
                                usePropName={false}
                                options={[]}
                            />
                        </TableCell>
                        <TableCell>
                            <InputSelect
                                label=""
                                required={false}
                                name="status"
                                // value={data.status ?? ""}
                                // onChange={({ target }) => {
                                //     setData({ ...data, [target.name]: target.value });
                                // }}
                                // fillFromApi={`${apiPath}/ddl`}
                                usePropName={false}
                                options={[]}
                            />
                        </TableCell>
                        <TableCell>
                            <IconButton>
                                <Icon>delete</Icon>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableBody>
                {/* <TableFooter>
                <TableRow>
                  <TableCell>
                  
                  </TableCell>
                   
                </TableRow>
            </TableFooter> */}
            </Table>
            <Buttons>
                <Button label="Dodajte novi uslov za akciju" icon={<Icon>difference</Icon>} />
            </Buttons>
        </>
    );
};

export default InputsRow;
