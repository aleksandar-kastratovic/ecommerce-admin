import { useEffect, useState } from "react";
import Button from "../../../../components/shared/Button/Button";
import Buttons from "../../../../components/shared/Form/Buttons/Buttons";
import NoteBox from "../../../../components/shared/NoteBox/NoteBox";
import useList from "../../../../hooks/useList";
import { InputCheckbox, InputInput } from "../FormInputs/FormInputs";

/**
 * Choose from a list.
 *
 * @param {{id: string|number, name: string}[]} available The list of available items.
 * @param {(string|number)[]} selected The list of selected ids from the available list.
 * @param {function((string|number)[])} onSubmit Submit the list of selected ids from the available list.
 *
 * @return {JSX.Element}
 * @constructor
 */
const SearchableListForm = ({ available = [], selected = [], onSubmit }) => {
    const { list, toggle, has } = useList(selected ?? []);
    const [search, setSearch] = useState("");

    // Filter the available
    available = available.filter((brand) => search === "" || brand.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <InputInput placeholder="Pretraga" value={search} onChange={(event) => setSearch(event.target.value)} />

            {/* The list of available items */}
            {available.map((brand) => (
                <InputCheckbox key={brand.id} value={has(brand.id)} label={brand.name} onChange={() => toggle(brand.id)} />
            ))}

            {/* There are no available to show */}
            {available.length === 0 && <NoteBox message="Lista je prazna" className="mt" />}

            <Buttons>
                <Button label="Sačuvaj" variant="contained" onClick={() => onSubmit(list)} />
            </Buttons>
        </>
    );
};

export default SearchableListForm;
