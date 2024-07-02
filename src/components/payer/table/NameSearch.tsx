import {Input} from "@/components/ui/input.tsx";
import {ChangeEvent, useContext, useState} from "react";
import {ParamContext} from "@/context/ParamContext.tsx";

export default function NameSearch() {
  const {setParam, setPage} = useContext(ParamContext)
  const [nameValue, setNameValue] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPage("1")
    const {value} = e.target
    setNameValue(value)
    setParam(value, "name")

    // if (delayTime.current) {
    //   clearTimeout(delayTime.current)
    // }
    //
    // delayTime.current = window.setTimeout(() => {
    //   getPayersData('payers')
    //   // console.log("pause")
    // }, 2000)
  }



  return (
      <Input
          placeholder="Filter payers names..."
          className="max-w-sm dark:text-white"
          value={nameValue}
          onChange={handleChange}
      />
  )
}