import {createContext, FC, ReactNode} from "react";
import {useSearchParams} from "react-router-dom";

type ParamTypes = "time" | "active" | "name" | "maxData" | "dateStart" | "dateEnd"

interface ParamContextData {
  page: string;
  maxData: string;
  time: string;
  active: string;
  name: string;
  dateRange: string;
  setPage: (value: string) => void;
  setParam: (value: string, param: ParamTypes) => void;
  setDateRange: (dateRange: string) => void
}

const DEFAULT_PAGE = '1'
const DEFAULT_MAX_DATA = '10'
const DEFAULT_TIME = 'all'//
const DEFAULT_ACTIVE = 'all'//
const DEFAULT_NAME = ''
const DEFAULT_DATE = '' //

export const ParamContext = createContext<ParamContextData>({
  page: DEFAULT_PAGE,
  maxData: DEFAULT_MAX_DATA,// pageSize
  time: DEFAULT_TIME,
  active: DEFAULT_ACTIVE,
  name: DEFAULT_NAME,
  dateRange: DEFAULT_DATE,
  setPage: () => undefined,
  setParam: () => undefined,
  setDateRange: () => undefined
})

export const ParamProvider: FC<{ children: ReactNode }> = ({children}) => {
  const [params, setParams] = useSearchParams(
      {
        page: DEFAULT_PAGE,
        maxData: DEFAULT_MAX_DATA,
        time: DEFAULT_TIME,//
        active: DEFAULT_ACTIVE,//
        name: DEFAULT_NAME,
        dateRange: DEFAULT_DATE,//
      }
  )
  const page = params.get('page') || DEFAULT_PAGE
  const maxData = params.get('maxData') || DEFAULT_MAX_DATA
  const time = params.get('time') || DEFAULT_TIME
  const active = params.get('active') || DEFAULT_ACTIVE
  const name = params.get('name') || DEFAULT_NAME
  const dateRange = params.get('dateRange') || DEFAULT_DATE

  const setParam = (value: string, param: ParamTypes) => {
    setParams(prev => {
      const result = new URLSearchParams(prev)
      result.set(param, value)
      result.set('page', '1')
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

  const setDateRange = (dateRange: string) => {
    setParams(prev => {
      const result = new URLSearchParams(prev)
      result.set('dateRange', dateRange)
      result.set('page', '1')
      return result
    })
  }


  const contextData: ParamContextData = {
    page,
    maxData,
    time,
    active,
    name,
    dateRange,
    setPage,
    setParam,
    setDateRange
  }

  return (
      <ParamContext.Provider value={contextData}>
        {children}
      </ParamContext.Provider>
  )
}