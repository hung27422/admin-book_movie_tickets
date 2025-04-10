import { TextField } from "@mui/material";
import React from "react";

interface TextFieldProps {
  label: string;
  name: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  type?: string;
  size?: "small" | "medium";
}

function TextFieldInputComponent({
  label,
  name,
  value,
  helperText,
  type,
  size,
  onChange,
}: TextFieldProps) {
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
      type={type}
      size={size}
    />
  );
}

const TextFieldInput = React.memo(TextFieldInputComponent);
export default TextFieldInput;
