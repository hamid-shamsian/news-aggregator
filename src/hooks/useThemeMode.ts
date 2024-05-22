import { useSelector } from "react-redux";

const useThemeMode = (): "light" | "dark" => useSelector((state: any) => state.themeMode);

export default useThemeMode;
