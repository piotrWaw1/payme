import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ChevronDown} from "lucide-react";
import {useContext, useEffect, useState} from "react";
import {ParamContext} from "@/context/ParamContext.tsx";

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Payment time <ChevronDown className="ml-2 h-4 w-4"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Payment time filter</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuRadioGroup value={selected} onValueChange={update}>
            <DropdownMenuRadioItem
                value="all">
              All
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
                value="1"
            >
              1 month
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
                value="2"
            >
              2 months
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
                value="3"
            >
              3 months
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}