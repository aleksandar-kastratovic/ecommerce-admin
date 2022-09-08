import { Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, MenuItem, Radio, Select, Switch, TextField } from "@mui/material"
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { useEffect, useState } from "react"
import useAPI from "../../../../api/api"

/**
 * Wrapper for the input element
 *
 * @param {JSX.Element} children
 * @param {string} label Field label
 * @param {string} error Error message
 * @param {"none"|"dense"|"normal"} margin The margin to use for FormControl.
 * @param {boolean} required If field is required
 * @param {boolean} disabled If field is disabled
 *
 * @return {JSX.Element}
 */

export const InputWrapper = ({ children = null, label, required, disabled, margin = "dense", error = null }) => {
    return (
        <FormControl fullWidth margin={margin} error={error !== null}>
            <FormLabel required={required} disabled={disabled}>
                {label}
            </FormLabel>
            {children}
        </FormControl>
    )
}

/**
 * Basic text input
 *
 * @param {string} label Field label
 * @param {boolean} required If field is required
 * @param {boolean} disabled If field is disabled
 * @param {string} error Error message
 * @param {string} name Input field name
 * @param {string} value Field value
 * @param {"none"|"dense"|"normal"} margin The margin to use for FormControl.
 * @param {function} onChange Change handler for the field
 * @param {string} description Field description
 * @param {string} placeholder Field placeholder
 *
 * @return {JSX.Element}
 */

export const InputInput = ({ label, required, disabled, error = null, name, value, margin = "dense", onChange = () => null, description, placeholder }) => {
    return (
        <InputWrapper label={label} required={required} disabled={disabled} margin={margin} error={error}>
            <TextField
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                helperText={error ? error : description}
                error={error !== null}
                sx={{
                    "& legend"  : { display: "none" },
                    "& fieldset": { top: 0 }
                }}
            />
        </InputWrapper>
    )
}

/**
 * Basic checkbox input
 *
 * @param {string} label Field label
 * @param {boolean} required If field is required
 * @param {boolean} disabled If field is disabled
 * @param {string} error Error message
 * @param {string} name Input field name
 * @param {string} value Field value
 * @param {"none"|"dense"|"normal"} margin The margin to use for FormControl.
 * @param {function} onChange Change handler for the field
 * @param {string} description Field description
 *
 * @return {JSX.Element}
 */

export const InputCheckbox = ({ label, required, disabled, name, value, error = null, margin = "dense", onChange = () => null, description }) => {
    return (
        <InputWrapper required={required} disabled={disabled} margin={margin} error={error}>
            <FormControlLabel control={<Checkbox name={name} checked={value} onChange={onChange} disabled={disabled} />} label={label} />
            <FormHelperText>{error ? error : description}</FormHelperText>
        </InputWrapper>
    )
}

/**
 * Basic radio input
 *
 * @param {string} label Field label
 * @param {boolean} required If field is required
 * @param {boolean} disabled If field is disabled
 * @param {string} error Error message
 * @param {string} name Input field name
 * @param {string} value Field value
 * @param {"none"|"dense"|"normal"} margin The margin to use for FormControl.
 * @param {function} onChange Change handler for the field
 * @param {string} description Field description
 *
 * @return {JSX.Element}
 */

export const InputRadio = ({ label, required, disabled, name, value, error = null, margin = "dense", onChange = () => null, description }) => {
    return (
        <InputWrapper required={required} disabled={disabled} margin={margin} error={error}>
            <FormControlLabel control={<Radio name={name} checked={value} onChange={onChange} disabled={disabled} />} label={label} />
            <FormHelperText>{error ? error : description}</FormHelperText>
        </InputWrapper>
    )
}

/**
 * Basic switch input
 *
 * @param {string} label Field label
 * @param {boolean} required If field is required
 * @param {boolean} disabled If field is disabled
 * @param {string} error Error message
 * @param {string} name Input field name
 * @param {string} value Field value
 * @param {"none"|"dense"|"normal"} margin The margin to use for FormControl.
 * @param {function} onChange Change handler for the field
 * @param {string} description Field description
 *
 * @return {JSX.Element}
 */

export const InputSwitch = ({ label, required, disabled, name, value, error = null, margin = "dense", onChange = () => null, description }) => {
    return (
        <InputWrapper required={required} disabled={disabled} margin={margin} error={error}>
            <FormControlLabel control={<Switch name={name} checked={value} onChange={onChange} disabled={disabled} />} label={label} />
            <FormHelperText>{error ? error : description}</FormHelperText>
        </InputWrapper>
    )
}

/**
 * Basic select input
 *
 * @param {string} label Field label
 * @param {boolean} required If field is required
 * @param {boolean} disabled If field is disabled
 * @param {string} error Error message
 * @param {string} name Input field name
 * @param {string} value Field value
 * @param {"none"|"dense"|"normal"} margin The margin to use for FormControl.
 * @param {function} onChange Change handler for the field
 * @param {string} description Field description
 * @param {string} fillFromApi Path to get select options from
 * @param {boolean} usePropName If api call should use prop name at the end of the path
 * @param {array} options Select options if there is no api call
 * @param {string} queryString Additional queryString for api call
 *
 * @return {JSX.Element}
 */

export const InputSelect = ({ label, required, disabled, error = null, name, value, margin = "dense", onChange = () => null, description, fillFromApi, usePropName, options, queryString = "" }) => {
    const api = useAPI()
    const [ opt, setOpt ] = useState(options)

    useEffect(() => {
        let isMounted = true
        let path = usePropName ? `${fillFromApi}/${name}?${queryString}` : `${fillFromApi}?${queryString}`
        const fillDdl = async () => {
            await api
                .get(path)
                .then((response) => {
                    if (isMounted) {
                        setOpt(response?.payload)
                    }
                })
                .catch((error) => {
                    console.warn(error)
                })
        }

        if (fillFromApi) {
            fillDdl()
        }

        return () => {
            isMounted = false
        }
    }, [])

    return (
        <InputWrapper label={label} required={required} disabled={disabled} margin={margin} error={error}>
            <Select
                name={name}
                value={(opt ?? []).length === 0 ? "" : value}
                onChange={onChange}
                disabled={disabled}
                sx={{
                    "& legend"  : { display: "none" },
                    "& fieldset": { top: 0 }
                }}
            >
                {(opt ?? []).map((item) => (
                    <MenuItem key={item.id} value={item.id} selected={item.id === value}>
                        {item.name}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{error ? error : description}</FormHelperText>
        </InputWrapper>
    )
}

/**
 * Basic textarea input
 *
 * @param {string} label Field label
 * @param {boolean} required If field is required
 * @param {boolean} disabled If field is disabled
 * @param {string} error Error message
 * @param {string} name Input field name
 * @param {string} value Field value
 * @param {"none"|"dense"|"normal"} margin The margin to use for FormControl.
 * @param {function} onChange Change handler for the field
 * @param {string} description Field description
 * @param {string} placeholder Field placeholder
 *
 * @return {JSX.Element}
 */

export const InputText = ({ label, required, disabled, error = null, name, value, margin = "dense", onChange = () => null, description, placeholder }) => {
    return (
        <InputWrapper label={label} required={required} disabled={disabled} margin={margin} error={error}>
            <TextField
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                multiline
                minRows={3}
                helperText={error ? error : description}
                error={error !== null}
                sx={{
                    "& legend"  : { display: "none" },
                    "& fieldset": { top: 0 }
                }}
            />
        </InputWrapper>
    )
}

/**
 * Basic datetime input
 *
 * @param {string} label Field label
 * @param {boolean} required If field is required
 * @param {boolean} disabled If field is disabled
 * @param {string} error Error message
 * @param {string} name Input field name
 * @param {string} value Field value
 * @param {"none"|"dense"|"normal"} margin The margin to use for FormControl.
 * @param {function} onChange Change handler for the field
 * @param {string} description Field description
 *
 * @return {JSX.Element}
 */

export const InputDateTime = ({ label, required, disabled, error = null, name, value, margin = "dense", onChange = () => null, description }) => {
    const handleChange = (newValue) => {
        const ev = {
            target: {
                name : name,
                value: newValue
            }
        }
        onChange(ev, "date_time")
    }
    return (
        <InputWrapper label={label} required={required} disabled={disabled} margin={margin} error={error}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    value={value !== "" ? value : null}
                    onChange={handleChange}
                    ampm={false}
                    showToolbar
                    disabled={disabled}
                    inputFormat="dd/MM/yyyy hh:mm"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            sx={{
                                "& legend"  : { display: "none" },
                                "& fieldset": { top: 0 }
                            }}
                        />
                    )}
                />
            </LocalizationProvider>
            <FormHelperText>{error ? error : description}</FormHelperText>
        </InputWrapper>
    )
}

/**
 * Basic date input
 *
 * @param {string} label Field label
 * @param {boolean} required If field is required
 * @param {boolean} disabled If field is disabled
 * @param {string} error Error message
 * @param {string} name Input field name
 * @param {string} value Field value
 * @param {"none"|"dense"|"normal"} margin The margin to use for FormControl.
 * @param {function} onChange Change handler for the field
 * @param {string} description Field description
 *
 * @return {JSX.Element}
 */

export const InputDate = ({ label, required, disabled, error = null, name, value, margin = "dense", onChange = () => null, description }) => {
    const handleChange = (newValue) => {
        const ev = {
            target: {
                name : name,
                value: newValue
            }
        }
        onChange(ev, "date")
    }
    return (
        <InputWrapper label={label} required={required} disabled={disabled} margin={margin} error={error}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    value={value !== "" ? value : null}
                    onChange={handleChange}
                    ampm={false}
                    showToolbar
                    disabled={disabled}
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            sx={{
                                "& legend"  : { display: "none" },
                                "& fieldset": { top: 0 }
                            }}
                        />
                    )}
                />
            </LocalizationProvider>
            <FormHelperText>{error ? error : description}</FormHelperText>
        </InputWrapper>
    )
}
