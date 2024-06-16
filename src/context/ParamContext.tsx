import {createContext, FC, ReactNode} from "react";
import {useSearchParams} from "react-router-dom";

interface ParamContextData {
  page: string;
  maxData: string;
  time: string;
  active: string;
  setPage: (value: string) => void;
  setParam: (value: string, param: "time" | "active") => void
}

const DEFAULT_PAGE = '1'
const DEFAULT_MAX_DATA = '10'
const DEFAULT_TIME = 'all'
const DEFAULT_ACTIVE = 'all'

export const ParamContext = createContext<ParamContextData>({
  page: DEFAULT_PAGE,
  maxData: DEFAULT_MAX_DATA,
  time: DEFAULT_TIME,
  active: DEFAULT_ACTIVE,
  setPage: () => undefined,
  setParam: () => undefined
})

export const ParamProvider: FC<{ children: ReactNode }> = ({children}) => {
  const [params, setParams] = useSearchParams(
      {
        page: DEFAULT_PAGE,
        maxData: DEFAULT_MAX_DATA,
        time: DEFAULT_TIME,
        active: DEFAULT_ACTIVE
      }
  )
  const page = params.get('page') || DEFAULT_PAGE
  const maxData = params.get('maxData') || DEFAULT_MAX_DATA
  const time = params.get('time') || DEFAULT_TIME
  const active = params.get('active') || DEFAULT_ACTIVE

  const setParam = (value: string, param: "time" | "active") => {
    setParams(prev => {
      const result = new URLSearchParams(prev)
      result.set(param, value)
      return result
    })
  }

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
    time,
    active,
    setPage,
    setParam
  }

  return (
      <ParamContext.Provider value={contextData}>
        {children}
      </ParamContext.Provider>
  )
}