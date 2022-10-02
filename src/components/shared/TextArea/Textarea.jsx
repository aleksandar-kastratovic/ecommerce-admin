import { TextareaAutosize } from "@mui/material";
import styles from "./Textarea.module.scss";

const Textarea = ({
  placeholder = "",
  name = "",
  onChange = () => {},
  value = "",
  disabled = false,
}) => {
  return (
    <TextareaAutosize
      aria-label="minimum height"
      minRows={3}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={styles.textarea}
    />
  );
};

export default Textarea;
