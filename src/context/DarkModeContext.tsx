import {createContext, FC, ReactNode, useState} from "react";

interface DarkModeData {
  darkMode: boolean;
  updateDarkMode: () => void;
}



export const DarkModeContext = createContext<DarkModeData>({
  darkMode: false,
  updateDarkMode: () => undefined
})

export const DarkModeProvider: FC<{ children: ReactNode }> = ({children}) => {

  const [darkMode, setDarkMode] = useState(false)

  const updateDarkMode = () => {
    setDarkMode(prevState => !prevState)
  }

  const contextData: DarkModeData = {
    darkMode,
    updateDarkMode
  }

  return (
      <DarkModeContext.Provider value={contextData}>
        {children}
      </DarkModeContext.Provider>
  )
}