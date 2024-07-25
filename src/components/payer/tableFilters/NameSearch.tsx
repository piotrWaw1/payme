import {Input} from "@/components/ui/input.tsx";
import {ChangeEvent, useRef, useState} from "react";
import {useTableParams} from "@/hooks/tableFilters/useTableParams.tsx";


const useDebouncedInput = () => {
  const {setParam, returnParam} = useTableParams()
  // const {setParam, name} = useContext(ParamContext)
  const delayTime = useRef<null | NodeJS.Timeout>(null)
  const [value, setValue] = useState(returnParam('name') ?? '')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    setValue(value)
    if (delayTime.current) {
      clearTimeout(delayTime.current)
    }
    delayTime.current = setTimeout(() => setParam("name", value), 400)
  }

  return [value, onChange] as const
}

export default function NameSearch({name}: { name: string }) {
  const [value, onChange] = useDebouncedInput()

  return (
      <Input
          name={name}
          placeholder="Filter payers names..."
          className="max-w-sm dark:text-white"
          value={value}
          onChange={onChange}
      />
  )
}