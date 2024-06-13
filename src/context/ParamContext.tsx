import {createContext, FC, ReactNode} from "react";
import {useSearchParams} from "react-router-dom";

interface ParamContextData {
  page: string;
  maxData: string;
  setPage: (value: string) => void;
}

const DEFAULT_PAGE = '1'
const DEFAULT_MAX_DATA = '10'

export const ParamContext = createContext<ParamContextData>({
  page: DEFAULT_PAGE,
  maxData: DEFAULT_MAX_DATA,
  setPage: () => undefined,
})

export const ParamProvider: FC<{ children: ReactNode }> = ({children}) => {
  const [params, setParams] = useSearchParams(
      {
        page: DEFAULT_PAGE,
        maxData: DEFAULT_MAX_DATA
      }
  )
  const page = params.get('page') || DEFAULT_PAGE
  const maxData = params.get('maxData') || DEFAULT_MAX_DATA

  const setPage = (value: string) => {
    setParams(prev => {
      const result = new URLSearchParams(prev)
      result.set('page', value)
      return result
    })
  }

  const contextData: ParamContextData = {
    page,
    maxData,
    setPage
  }

  return (
      <ParamContext.Provider value={contextData}>
        {children}
      </ParamContext.Provider>
  )
}