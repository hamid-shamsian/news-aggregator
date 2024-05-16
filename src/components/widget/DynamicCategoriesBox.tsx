import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import SelectBox from "../common/SelectBox";
import { useData } from "../../hooks/useData";
import { DataType, ICategory, ISource } from "../../@types";

interface DynamicCategoriesBoxProps {
  source: ISource;
  onCategoryChange: (cat: string) => void;
}

const DynamicCategoriesBox = ({ source, onCategoryChange }: DynamicCategoriesBoxProps) => {
  const { data, isFetching } = useData<ICategory>(DataType.category, source);

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      {isFetching && <CircularProgress size={23} sx={{ position: "absolute", right: 8, top: 16, bgcolor: "#fff", zIndex: 1 }} />}
      <SelectBox label='Category' options={[{ label: "All", value: "" }, ...(data?.dataArr ?? [])]} onValueChange={onCategoryChange} />
    </Box>
  );
};

export default DynamicCategoriesBox;
