import { useRef, forwardRef, useImperativeHandle } from "react";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";

export interface IDatePickerHandle {
  getValue: () => string | undefined;
}

const UncontrolledDatePicker = forwardRef(({ label, initialValue }: { label: string; initialValue?: string }, ref) => {
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
        value={initialValue ? dayjs(initialValue) : null}
        slots={{ textField: props => <TextField {...props} inputRef={dateRef} /> }}
        slotProps={{ field: { clearable: true } }}
      />
    </LocalizationProvider>
  );
});
export default UncontrolledDatePicker;
