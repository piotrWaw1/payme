import {useContext, useEffect, useState} from "react";
import {ParamContext} from "@/context/ParamContext.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
export default function PaymentTimeFilter() {
  const [selected, setSelected] = useState("all")
  const {time, setParam, setPage} = useContext(ParamContext)

  const update = (value: string) => {
    setPage('1')
    setParam(value, 'time')
  }

  useEffect(() => {
    setSelected(time)
  }, [time]);

  return (
      <Select onValueChange={update} value={selected}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Payment time" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Payment time filter</SelectLabel>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="1">1 month</SelectItem>
            <SelectItem value="2">2 months</SelectItem>
            <SelectItem value="3">3 months</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
  )
}