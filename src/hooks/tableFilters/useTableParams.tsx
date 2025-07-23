import {useSearchParams} from "react-router-dom";
import {useCallback} from "react";

const DEFAULT_TIME = 'all'
const DEFAULT_ACTIVE = 'all'
const DEFAULT_DATE = ''

export const useTableParams = () => {
  const [params, setParams] = useSearchParams({
    time: DEFAULT_TIME,
    active: DEFAULT_ACTIVE,
    dateRange: DEFAULT_DATE
  })

  const returnParam = useCallback((param: string) => {
    return params.get(param) || ''
  }, [params])

  const setParam = (param: string, value: string) => {

    setParams(prev => {
      const result = new URLSearchParams(prev)

      if (!value || value === 'all') {
        result.delete(param)
      } else {
        result.set(param, value)
      }
      result.set('page', '1')

      return result
    })
  }
  // test123@gmail.com
  // Password123!@#
  return {returnParam, setParam}
}