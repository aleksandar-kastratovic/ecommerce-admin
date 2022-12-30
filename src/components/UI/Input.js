import Select from "react-select";

const Input = (props) => {
    const inputElement = () => {
        const inputId = props.id ? props.id : Math.random();
        const errorVisible = props.inputErrorVisible !== undefined ? props.inputErrorVisible : true;
        const errorText = props.inputErrorText ? props.inputErrorText : "nije validna!";

        switch (props.inputType) {
            case "input":
                return (
                    <>
                        {props.text && (
                            <p htmlFor={inputId} className={(props.text_class ? props.text_class : "") + " form-control-label"}>
                                {props.text}
                            </p>
                        )}
                        <input
                            autoComplete={props.offAutoComplete ? "new-password" : ""}
                            value={props.inputValue}
                            onKeyDown={props.onInputKeyDown}
                            onChange={props.onInputChange}
                            onBlur={props.onInputBlur}
                            id={inputId}
                            type={props.type ? props.type : "text"}
                            className={props.class ? props.class : ""}
                            disabled={props.disabled}
                        />
                        {errorVisible && props.text !== undefined && (
                            <p className={"error-text " + (props.errorClass ? props.errorClass : "")}> {props.hasInputError ? props.text + " " + errorText : ""} </p>
                        )}
                        {errorVisible && props.text === undefined && <p className="error-text"> {props.hasInputError ? errorText : ""} </p>}
                        {!errorVisible && <p className="error-text"></p>}
                    </>
                );
            case "select":
                return (
                    <>
                        {props.text && (
                            <p htmlFor={inputId} className={(props.text_class ? props.text_class : "") + " form-control-label"}>
                                {props.text}
                            </p>
                        )}
                        <select value={props.inputValue} onChange={props.onInputChange} id={inputId} className={props.class ? props.class : ""} disabled={props.disabled}>
                            <option key={inputId} value=""></option>;
                            {props.selectData.map(function (object) {
                                return (
                                    <option key={object.id} value={object.id}>
                                        {object.name}
                                    </option>
                                );
                            })}
                        </select>
                        {errorVisible && <p className="error-text"> {props.hasInputError ? props.text + " " + errorText : ""} </p>}
                        {!errorVisible && <p className="error-text"></p>}
                    </>
                );
            case "select-react":
                return (
                    <>
                        {props.text && !props.remove && (
                            <p htmlFor={inputId} className={(props.text_class ? props.text_class : "") + " form-control-label"}>
                                {props.text}
                            </p>
                        )}
                        {props.text && props.remove && (
                            <div className="row row-m0 justify-content-between">
                                <p htmlFor={inputId} className={(props.text_class ? props.text_class : "") + " form-control-label label-with-remove"}>
                                    {props.text}
                                </p>
                                <button onClick={props.onRemove} className="btn-control remove-options">
                                    Ukloni
                                </button>
                            </div>
                        )}
                        <Select
                            className={(props.class ? props.class : "") + " basic-single"}
                            classNamePrefix="select"
                            isDisabled={props.disabled}
                            placeholder={props.placeHolder ?? ""}
                            isClearable
                            isSearchable={props.isSearchable ?? true}
                            onInputChange={props.onInputBlur}
                            isMulti={props.isMulti}
                            value={props.data?.filter((obj) => obj.id === props.value || props.values?.includes(obj.id))}
                            options={props.data}
                            getOptionLabel={(option) => option.name || option.attribute_name || option.company_name}
                            getOptionValue={(option) => option.id}
                            onChange={props.handleChange}
                        />
                        {errorVisible && <p className="error-text"> {props.hasInputError ? props.text + " " + errorText : ""} </p>}
                        {!errorVisible && <p className="error-text"></p>}
                    </>
                );
            case "textarea":
                return (
                    <>
                        {props.text && (
                            <p htmlFor={inputId} className={(props.text_class ? props.text_class : "") + " form-control-label"}>
                                {props.text}
                            </p>
                        )}
                        <textarea
                            disabled={props.disabled}
                            value={props.inputValue}
                            onChange={props.onInputChange}
                            onBlur={props.onInputBlur}
                            id={props.id ? props.id : Math.random()}
                            className={props.class ? props.class : ""}
                        ></textarea>
                        {!errorVisible && <p className="error-text"></p>}
                    </>
                );
            default:
                return <h1>No input type match!</h1>;
        }
    };

    return inputElement();
};

export default Input;
