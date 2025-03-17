import { TextField } from "@mui/material";

interface TextFieldProps {
  label: string;
  name: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
}
function TextFieldInput({ label, name, value, helperText, onChange }: TextFieldProps) {
  return (
    <TextField
      className="w-full"
      id="outlined-basic"
      label={label}
      name={name}
      value={value}
      sx={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
      onChange={onChange}
      variant="outlined"
      helperText={helperText}
    />
  );
}

export default TextFieldInput;
