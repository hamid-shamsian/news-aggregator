import { useSelector } from "react-redux";
import { IFilters } from "../@types";

const useFilters = (): IFilters => useSelector((state: any) => state.filters);

export default useFilters;
