import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface SelectBoxProps {
  label: string;
  options: {
    label: string;
    value: string;
    isDefault?: boolean;
  }[];
  onValueChange: (value: string) => void;
}

const SelectBox = ({ label, options = [], onValueChange }: SelectBoxProps) => {
  const [value, setValue] = useState(options.find(option => option.isDefault)?.value ?? "");

  const handleChange = ({ target: { value } }: SelectChangeEvent) => {
    setValue(value);
    onValueChange(value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={handleChange}>
        {options.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectBox;
