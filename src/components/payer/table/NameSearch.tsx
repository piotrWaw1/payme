import {Input} from "@/components/ui/input.tsx";
import {ChangeEvent, useContext, useEffect, useRef, useState} from "react";
import {TableFiltersContext} from "@/context/TableFiltersContext.tsx";
import {ParamContext} from "@/context/ParamContext.tsx";

export default function NameSearch() {
  const {getPayersData, filterName} = useContext(TableFiltersContext)
  const {setParam} = useContext(ParamContext)
  const [nameValue, setNameValue] = useState('')
  const [value, setValue] = useState('')
  const delayTime = useRef<number | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    setNameValue(value)
    setParam(value, "name")

    if (delayTime.current) {
      clearTimeout(delayTime.current)
    }

    delayTime.current = window.setTimeout(() => {
      setValue(e.target.value)
    }, 800)

  }
  useEffect(() => {
    if (value !== '') {
      filterName()
    } else {
      getPayersData('payers')
    }
    return () => {
      if (delayTime.current) {
        clearTimeout(delayTime.current);
      }
    };
  }, [filterName, getPayersData, value]);

  return (
      <Input
          placeholder="Filter payers names..."
          className="max-w-sm"
          value={nameValue}
          onChange={handleChange}
      />
  )
}