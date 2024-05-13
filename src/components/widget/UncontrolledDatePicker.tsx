import { useRef, forwardRef, useImperativeHandle } from "react";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";

export interface IDatePickerHandle {
  getValue: () => string | undefined;
}

const UncontrolledDatePicker = forwardRef(({ label }: { label: string }, ref) => {
  const dateRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    getValue: () => dateRef.current?.value
  }));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        sx={{ width: "100%" }}
        label={label}
        format='YYYY-MM-DD'
        slots={{ textField: props => <TextField {...props} inputRef={dateRef} /> }}
        slotProps={{ field: { clearable: true } }}
      />
    </LocalizationProvider>
  );
});
export default UncontrolledDatePicker;
