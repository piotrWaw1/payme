import {Input} from "@/components/ui/input.tsx";
import {ChangeEvent, useContext, useEffect, useRef, useState} from "react";
import {ParamContext} from "@/context/ParamContext.tsx";

export default function NameSearch() {
  const {setParam, name} = useContext(ParamContext)
  const delayTime = useRef<null | NodeJS.Timeout>(null)
  const [value, setValue] = useState('')
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    setValue(value)

    if (delayTime.current) {
      clearTimeout(delayTime.current)
    }

    delayTime.current = setTimeout(() => setParam(value, "name"), 1500)
  }

  useEffect(() => {
    setValue(name)
  }, [name]);

  return (
      <Input
          placeholder="Filter payers names..."
          className="max-w-sm dark:text-white"
          value={value}
          onChange={handleChange}
      />
  )
}