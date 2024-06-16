import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ChevronDown} from "lucide-react";
import {useContext, useEffect, useState} from "react";
import {ParamContext} from "@/context/ParamContext.tsx";

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Payer active <ChevronDown className="ml-2 h-4 w-4"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Payers active filter</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuRadioGroup value={selected} onValueChange={update}>
            <DropdownMenuRadioItem
                value="all">
              All
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
                value="true"
            >
              Active
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
                value="false"
            >
              Inactive
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}