import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import SelectBox from "../common/SelectBox";
import useData from "../../hooks/useData";
import { DataType, ICategory, ISource } from "../../@types";

interface DynamicCategoriesBoxProps {
  source: ISource;
  onCategoryChange: (cat: string) => void;
}

const DynamicCategoriesBox = ({ source, onCategoryChange }: DynamicCategoriesBoxProps) => {
  const { data: categoriesArr, isFetching } = useData<ICategory>(DataType.category, source);

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      {isFetching && <CircularProgress size={23} sx={{ position: "absolute", right: 8, top: 16, backgroundColor: "#fff", zIndex: 1 }} />}
      {categoriesArr && <SelectBox label='Category' options={categoriesArr} onValueChange={onCategoryChange} />}
    </Box>
  );
};

export default DynamicCategoriesBox;