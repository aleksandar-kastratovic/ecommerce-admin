import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

/**
 * Wrapper for the input element
 *
 * @param {JSX.Element} children
 * @param {string} label Field label
 * @param {string} error Error message
 * @param {boolean} required If field is required
 * @param {boolean} disabled If field is disabled
 *
 * @return {JSX.Element}
 */

export const InputWrapper = ({
  children = null,
  label,
  required,
  disabled,
  error = null,
}) => {
  return (
    <FormControl fullWidth margin="dense" error={error !== null}>
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
 * @param {function} onChange Change handler for the field
 * @param {string} description Field description
 * @param {string} placeholder Field placeholder
 *
 * @return {JSX.Element}
 */

export const InputInput = ({
  label,
  required,
  disabled,
  error = null,
  name,
  value,
  onChange = () => {},
  description,
  placeholder,
}) => {
  return (
    <InputWrapper
      label={label}
      required={required}
      disabled={disabled}
      error={error}
    >
      <TextField
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
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
 * Basic checkbox input
 *
 * @param {string} label Field label
 * @param {boolean} required If field is required
 * @param {boolean} disabled If field is disabled
 * @param {string} error Error message
 * @param {string} name Input field name
 * @param {string} value Field value
 * @param {function} onChange Change handler for the field
 * @param {string} description Field description
 *
 * @return {JSX.Element}
 */

export const InputCheckbox = ({
  label,
  required,
  disabled,
  error = null,
  name,
  value,
  onChange = () => {},
  description,
}) => {
  return (
    <InputWrapper required={required} disabled={disabled} error={error}>
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            checked={value}
            onChange={onChange}
            disabled={disabled}
          />
        }
        label={label}
      />
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
 * @param {function} onChange Change handler for the field
 * @param {string} description Field description
 *
 * @return {JSX.Element}
 */

export const InputRadio = ({
  label,
  required,
  disabled,
  error = null,
  name,
  value,
  onChange = () => {},
  description,
}) => {
  return (
    <InputWrapper required={required} disabled={disabled} error={error}>
      <FormControlLabel
        control={
          <Radio
            name={name}
            checked={value}
            onChange={onChange}
            disabled={disabled}
          />
        }
        label={label}
      />
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
 * @param {string} value Field value
 * @param {function} onChange Change handler for the field
 * @param {string} description Field description
 *
 * @return {JSX.Element}
 */

export const InputSwitch = ({
  label,
  required,
  disabled,
  error = null,
  name,
  value,
  onChange = () => {},
  description,
}) => {
  return (
    <InputWrapper required={required} disabled={disabled} error={error}>
      <FormControlLabel
        control={
          <Switch
            name={name}
            checked={value}
            onChange={onChange}
            disabled={disabled}
          />
        }
        label={label}
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
 * @param {function} onChange Change handler for the field
 * @param {string} description Field description
 * @param {array} options Select options
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
  onChange = () => {},
  description,
  options,
}) => {
  return (
    <InputWrapper
      label={label}
      required={required}
      disabled={disabled}
      error={error}
    >
      <Select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        sx={{
          "& legend": { display: "none" },
          "& fieldset": { top: 0 },
        }}
      >
        {(options ?? []).map((item) => (
          <MenuItem key={item.id} value={item.id} selected={item.id === value}>
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
 * @param {function} onChange Change handler for the field
 * @param {string} description Field description
 * @param {string} placeholder Field placeholder
 *
 * @return {JSX.Element}
 */

export const InputText = ({
  label,
  required,
  disabled,
  error = null,
  name,
  value,
  onChange = () => {},
  description,
  placeholder,
}) => {
  return (
    <InputWrapper
      label={label}
      required={required}
      disabled={disabled}
      error={error}
    >
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
 * @param {function} onChange Change handler for the field
 * @param {string} description Field description
 *
 * @return {JSX.Element}
 */

export const InputDateTime = ({
  label,
  required,
  disabled,
  error = null,
  name,
  value,
  onChange = () => {},
  description,
}) => {
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
    <InputWrapper
      label={label}
      required={required}
      disabled={disabled}
      error={error}
    >
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
 * @param {function} onChange Change handler for the field
 * @param {string} description Field description
 *
 * @return {JSX.Element}
 */

export const InputDate = ({
  label,
  required,
  disabled,
  error = null,
  name,
  value,
  onChange = () => {},
  description,
}) => {
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
    <InputWrapper
      label={label}
      required={required}
      disabled={disabled}
      error={error}
    >
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
