import { useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import UncontrolledDatePicker, { IDatePickerHandle } from "./UncontrolledDatePicker";

interface DateFilterBoxProps {
  onChangeValues: (values: { from: string; to: string }) => void;
}

const DateFilterBox = ({ onChangeValues }: DateFilterBoxProps) => {
  const fromRef = useRef<IDatePickerHandle>(null);
  const toRef = useRef<IDatePickerHandle>(null);

  const handleChangeValues = () => {
    onChangeValues({ from: fromRef.current?.getValue() ?? "", to: toRef.current?.getValue() ?? "" });
  };

  return (
    <Box
      sx={{
        width: "100%",
        border: "1px dashed #aaa",
        borderRadius: 1,
        p: 2,
        display: "grid",
        gap: 2,
        gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }
      }}
    >
      <UncontrolledDatePicker label='From' ref={fromRef} />
      <UncontrolledDatePicker label='To' ref={toRef} />

      <Button variant='outlined' onClick={handleChangeValues} sx={{ py: 1.9 }}>
        Apply Date Filters
      </Button>
    </Box>
  );
};

export default DateFilterBox;
