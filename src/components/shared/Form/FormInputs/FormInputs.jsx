import { useEffect, useState } from "react";

import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import useAPI from "../../../../api/api";
import HtmlEditor from "../../HtmlEditor/HtmlEditor";

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

export const InputWrapper = ({ children = null, label, required, disabled, margin = "dense", error = null, fullWidth = true }) => {
  return (
    <FormControl fullWidth={fullWidth} margin={margin} error={error !== null}>
      <FormLabel required={required} disabled={disabled}>
        {label}
      </FormLabel>
      {children}
    </FormControl>
  );
};

/**
 * Basic text input
 *
 * @param {string} label Field label
 * @param {boolean} required If field is required
 * @param {boolean} disabled If field is disabled
 * @param {string} error Error message
 * @param {string} name Input field name
 * @param {string} value Field value
 * @param {boolean} autoFocus True to allow this input to capture focus.
 * @param {string} type The type of the input.
 * @param {"none"|"dense"|"normal"} margin The margin to use for FormControl.
 * @param {function} onChange Change handler for the field
 * @param {string} description Field description
 * @param {string} placeholder Field placeholder
 * @param {boolean} readOnly If input is read only
 *
 * @return {JSX.Element}
 */

export const InputInput = ({ label, required, disabled, name, value, autoFocus, type = "text", error = null, margin = "dense", onChange = () => null, description, placeholder, readOnly }) => {
  return (
    <InputWrapper label={label} required={required} disabled={disabled} margin={margin} error={error}>
      <TextField
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        autoFocus={autoFocus}
        helperText={error ? error : description}
        error={error !== null}
        sx={{
          "& legend": { display: "none" },
          "& fieldset": { top: 0 },
        }}
      />
    </InputWrapper>
  );
};

/**
 * Basic number input
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

export const InputNumber = ({ label, required, disabled, error = null, name, value, margin = "dense", onChange = () => null, description, placeholder, autoFocus }) => {
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
        autoFocus={autoFocus}
        type="number"
        sx={{
          "& legend": { display: "none" },
          "& fieldset": { top: 0 },
        }}
        onWheel={(e) => e.target.blur()}
      />
    </InputWrapper>
  );
};

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

export const InputCheckbox = ({ label, required, disabled, name, value, error = null, margin = "dense", onChange = () => null, description, labelStyle, styleCheckbox }) => {
  return (
    <InputWrapper required={required} disabled={disabled} margin={margin} error={error}>
      <FormControlLabel control={<Checkbox name={name} checked={value} onChange={onChange} disabled={disabled} sx={styleCheckbox} />} label={label} sx={labelStyle} />
      <FormHelperText>{error ? error : description}</FormHelperText>
    </InputWrapper>
  );
};

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
  );
};

/**
 * Basic switch input
 *
 * @param {string} label Field label
 * @param {boolean} required If field is required
 * @param {boolean} disabled If field is disabled
 * @param {string} error Error message
 * @param {string} name Input field name
 * @param {boolean} value Field value
 * @param {"none"|"dense"|"normal"} margin The margin to use for FormControl.
 * @param {function} onChange Change handler for the field
 * @param {string} description Field description
 *
 * @return {JSX.Element}
 */

export const InputSwitch = ({ label, required, disabled, name, value, error = null, margin = "dense", onChange = () => null, description, fullWidth = true }) => {
  return (
    <InputWrapper required={required} disabled={disabled} margin={margin} error={error} fullWidth={fullWidth}>
      <FormControlLabel control={<Switch name={name} value={value} checked={value} onChange={onChange} disabled={disabled} />} label={label} />
      <FormHelperText>{error ? error : description}</FormHelperText>
    </InputWrapper>
  );
};

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

export const InputSelect = ({
  label,
  required,
  disabled,
  error = null,
  name,
  value,
  margin = "dense",
  onChange = () => null,
  description,
  fillFromApi,
  usePropName,
  options,
  queryString = "",
  optionsIsEmpty = () => { },
  className,
  onDataReceived = () => null,
}) => {
  const api = useAPI();
  const [opt, setOpt] = useState(options);

  useEffect(() => {
    let isMounted = true;
    let path = usePropName ? `${fillFromApi}/${name}?${queryString}` : `${fillFromApi}?${queryString}`;
    const fillDdl = async () => {
      await api
        .get(path)
        .then((response) => {
          if (isMounted) {
            let res = response?.payload;
            setOpt(res);
            onDataReceived(res);
          }
        })
        .catch((error) => {
          console.warn(error);
        });
    };

    if (fillFromApi) {
      fillDdl();
    }

    return () => {
      isMounted = false;
    };
  }, [fillFromApi, queryString]);

  useEffect(() => {
    if (opt?.length === 0) {
      optionsIsEmpty(true);
    } else {
      optionsIsEmpty(false);
    }
  }, [opt]);


  return (
    <InputWrapper label={label} required={required} disabled={disabled} margin={margin} error={error}>
      <Select
        className={className}
        name={name}
        value={(opt ?? []).length === 0 ? "" : value}
        onChange={onChange}
        disabled={disabled}
        sx={{
          "& legend": { display: "none" },
          "& fieldset": { top: 0 },
        }}

      >
        {(opt ?? []).map((item) => (
          <MenuItem key={item.id} value={item.id} selected={item.id === value} disabled={item?.disabled ?? false} props={item.props} valuename={item.name}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error ? error : description}</FormHelperText>
    </InputWrapper>
  );
};

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

export const AutocompleteInput = ({
  label,
  required,
  disabled,
  error = null,
  name,
  value,
  margin = "dense",
  onChange = () => { },
  description,
  fillFromApi,
  usePropName,
  options,
  queryString = "",
  optionsIsEmpty = () => { }
}) => {
  const api = useAPI();
  const [opt, setOpt] = useState(options);
  const [myValue, setMyValue] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let path = usePropName ? `${fillFromApi}/${name}?${queryString}` : `${fillFromApi}?${queryString}`;
    const fillDdl = async () => {
      await api
        .get(path)
        .then((response) => {
          if (isMounted) {
            setOpt(response?.payload);
          }
        })
        .catch((error) => {
          console.warn(error);
        });
    };

    if (fillFromApi) {
      fillDdl();
    }

    return () => {
      isMounted = false;
    };
  }, [fillFromApi]);

  useEffect(() => {
    if (opt?.length === 0) {
      optionsIsEmpty(true);
    } else {
      optionsIsEmpty(false);
    }
    let selectedOption = null;
    if (opt.length > 0) {
      selectedOption = opt.find((o) => o.id === value)?.name;
      if (selectedOption === undefined) {
        selectedOption = null;
      }
      setMyValue(selectedOption);
    }
  }, [opt]);

  return (
    <InputWrapper label={label} required={required} disabled={disabled} margin={margin} error={error}>
      <Autocomplete
        value={myValue}
        onInputChange={(event, newInputValue) => {
          let newIval = newInputValue ? newInputValue : "";
          setMyValue(newIval);
          if (opt.length > 0) {
            let selectedOption = opt.find((o) => o.name === newInputValue);
            if (selectedOption) {
              newIval = selectedOption.id;
            }
          }
          onChange(name, newIval);
        }}
        options={opt.map((option) => option.name)}
        sx={{
          "& legend": { display: "none" },
          "& fieldset": { top: 0 },
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <FormHelperText>{error ? error : description}</FormHelperText>
    </InputWrapper>
  );
};


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

// Component that allows you to select more values, as well as add new values
export const AutocompleteTagsFilled = ({
  label,
  required,
  disabled,
  error = null,
  name,
  value,
  margin = "dense",
  onChange = () => { },
  description,
  fillFromApi,
  usePropName,
  options,
  queryString = "",
  optionsIsEmpty = () => { }
}) => {
  const api = useAPI();
  const [opt, setOpt] = useState(options);
  const [myValue, setMyValue] = useState([]);

  useEffect(() => {
    let isMounted = true;
    let path = usePropName ? `${fillFromApi}/${name}?${queryString}` : `${fillFromApi}?${queryString}`;
    const fillDdl = async () => {
      await api
        .get(path)
        .then((response) => {
          if (isMounted) {
            setOpt(response?.payload);
          }
        })
        .catch((error) => {
          console.warn(error);
        });
    };

    if (fillFromApi) {
      fillDdl();
    }

    return () => {
      isMounted = false;
    };
  }, [fillFromApi]);

  useEffect(() => {
    if (opt?.length === 0) {
      optionsIsEmpty(true);
    } else {
      optionsIsEmpty(false);
    }

    let selectedOptions = [];
    if (opt.length > 0) {
      if (typeof value === 'object') {
        value.map((item) => {
          let selectedOption = opt.find((o) => o.id === item)?.name;
          if (selectedOption !== undefined) {
            selectedOptions.push(selectedOption);
          }
        });
      }

      setMyValue(selectedOptions);
    }
  }, [opt]);

  return (
    <InputWrapper label={label} required={required} disabled={disabled} margin={margin} error={error}>
      <Autocomplete
        multiple
        value={myValue}
        onChange={(event, newInputValue, reason) => {
          let newIval = newInputValue ? newInputValue : [];
          setMyValue(newIval);

          let for_save = {
            'exist': [],
            'new': [],
          };
          if (opt.length > 0) {
            newInputValue.map((item) => {
              let selectedOption = opt.find((o) => o.name === item);
              if (selectedOption) {
                for_save.exist.push(selectedOption.id);
              } else {
                for_save.new.push(item);
              }
            });
          }
          onChange(name, for_save); // Global save data change
        }}
        options={opt.map((option) => option.name)}
        sx={{
          "& legend": { display: "none" },
          "& fieldset": { top: 0 },
        }}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          < TextField
            {...params}
          />
        )}
      />
      <FormHelperText>{error ? error : description}</FormHelperText>
    </InputWrapper>
  );
};

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

export const InputMultiSelect = ({
  label,
  required,
  disabled,
  error = null,
  name,
  value,
  margin = "dense",
  onChange = () => null,
  description,
  fillFromApi,
  usePropName,
  options,
  queryString = "",
  optionsIsEmpty = () => { },
}) => {
  const api = useAPI();
  const [opt, setOpt] = useState(options);
  useEffect(() => {
    let isMounted = true;
    let path = usePropName ? `${fillFromApi}/${name}?${queryString}` : `${fillFromApi}?${queryString}`;
    const fillDdl = async () => {
      await api
        .get(path)
        .then((response) => {
          if (isMounted) {
            setOpt(response?.payload);
          }
        })
        .catch((error) => {
          console.warn(error);
        });
    };

    if (fillFromApi) {
      fillDdl();
    }

    return () => {
      isMounted = false;
    };
  }, [fillFromApi]);

  useEffect(() => {
    if (opt?.length === 0) {
      optionsIsEmpty(true);
    } else {
      optionsIsEmpty(false);
    }
  }, [opt]);

  return (
    <InputWrapper label={label} required={required} disabled={disabled} margin={margin} error={error}>
      <Select
        name={name}
        value={(opt ?? []).length === 0 ? "" : value}
        onChange={onChange}
        disabled={disabled}
        multiple={true}
        renderValue={(selected) => {
          let display = [];
          for (const option of opt) {
            if (selected.includes(option.id)) {
              display.push(option.name);
            }
          }
          return display.join(", ");
        }}
        sx={{
          "& legend": { display: "none" },
          "& fieldset": { top: 0 },
        }}
      >
        {(opt ?? []).map((item) => (
          <MenuItem key={item.id} value={item.id} selected={item.id === value} disabled={item?.disabled ?? false}>
            <ListItemIcon>
              <Checkbox checked={value.indexOf(item.id) > -1} />
            </ListItemIcon>

            {item.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error ? error : description}</FormHelperText>
    </InputWrapper>
  );
};

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
          "& legend": { display: "none" },
          "& fieldset": { top: 0 },
        }}
      />
    </InputWrapper>
  );
};

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
        name: name,
        value: newValue,
      },
    };
    onChange(ev, "date_time");
  };
  return (
    <InputWrapper label={label} required={required} disabled={disabled} margin={margin} error={error}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          value={value !== "" ? value : null}
          onChange={handleChange}
          ampm={false}
          showToolbar
          disabled={disabled}
          inputFormat="dd/MM/yyyy HH:mm"
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                "& legend": { display: "none" },
                "& fieldset": { top: 0 },
              }}
            />
          )}
        />
      </LocalizationProvider>
      <FormHelperText>{error ? error : description}</FormHelperText>
    </InputWrapper>
  );
};

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
        name: name,
        value: newValue,
      },
    };
    onChange(ev, "date");
  };
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
                "& legend": { display: "none" },
                "& fieldset": { top: 0 },
              }}
            />
          )}
        />
      </LocalizationProvider>
      <FormHelperText>{error ? error : description}</FormHelperText>
    </InputWrapper>
  );
};

/**
 * Input that returns html
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

export const InputHtml = ({ label, required, disabled, name, value, error = null, margin = "dense", onChange = () => null, description }) => {
  return (
    <InputWrapper label={label} required={required} disabled={disabled} margin={margin} error={error}>
      <HtmlEditor name={name} value={value} onChange={onChange} />
      <FormHelperText>{error ? error : description}</FormHelperText>
    </InputWrapper>
  );
};
