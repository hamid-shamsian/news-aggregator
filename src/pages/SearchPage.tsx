import { ChangeEvent, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import NewsExplorer from "../components/widget/NewsExplorer";
import { debounce } from "@mui/material";
import config from "../../config.json";

const { SOURCES } = config;

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQueryChange = debounce(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(value);
  }, 700);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      <Typography variant='h3' component='h1'>
        Search in News
      </Typography>

      <TextField fullWidth placeholder='Search in News . . .' onChange={handleSearchQueryChange} />

      <NewsExplorer sources={SOURCES} searchQuery={searchQuery} />
    </Box>
  );
};

export default SearchPage;
