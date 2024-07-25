import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select.tsx";
import {FC} from "react";
import {useTableParams} from "@/hooks/tableFilters/useTableParams.tsx";

interface SelectValues {
  value: string;
  title?: string;
  className?: string;
}

interface SelectComponentProps {
  label: string;
  placeholder?: string;
  propsName: string;
  values: SelectValues[];
}

export const SelectComponent: FC<SelectComponentProps> = (props) => {
  const {label, placeholder, values, propsName} = props
  const {setParam, returnParam} = useTableParams()
  const paramValue = returnParam(propsName)

  return (
      <Select
          onValueChange={(value) => setParam(propsName, value)}
          value={paramValue || values[0].value}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder}/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {values.map((value, index) => (
                <SelectItem key={index} className={value.className} value={value.value}>
                  {value.title || value.value.toUpperCase()}
                </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
  )
}
