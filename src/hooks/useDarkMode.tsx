import {useContext} from "react";
import {DarkModeContext} from "@/context/DarkModeContext.tsx";

const useDarkMode = () => useContext(DarkModeContext)

export default useDarkMode