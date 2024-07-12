import {useContext, useEffect, useState} from "react";
import {ParamContext} from "@/context/ParamContext.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select.tsx";

export default function IsActiveFilter() {
  const [selected, setSelected] = useState("all")
  const {active, setParam, setPage} = useContext(ParamContext)
  const update = (value: string) => {
    setPage('1')
    setParam(value, 'active')
  }
  useEffect(() => {
    setSelected(active)
  }, [active]);

  return (
      <Select onValueChange={update} value={selected}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Payer active"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Payer active filter</SelectLabel>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true" className="text-green-600 dark:text-green-500">Active</SelectItem>
            <SelectItem value="false" className="text-red-600 dark:text-rose-500 ">Inactive</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
  )
}