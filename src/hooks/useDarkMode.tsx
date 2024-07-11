import {useContext} from "react";
import {DarkModeContext} from "@/context/ThemeProvider.tsx";

const useDarkMode = () => useContext(DarkModeContext)

export default useDarkMode