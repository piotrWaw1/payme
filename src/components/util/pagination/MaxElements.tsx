import {cn} from "@/lib/utils.ts";
import {useContext, useState} from "react";
import {ParamContext} from "@/context/ParamContext.tsx";

export default function MaxElements() {
  const {maxData, setParam} = useContext(ParamContext)
  const [quantity, setQuantity] = useState(maxData)
  const defaultClass = "flex items-center px-3 h-10 font-medium text-secondary-foreground " +
      "cursor-pointer ease-in duration-200 hover:bg-primary hover:text-primary-foreground"

  const handleChange = (num: string) => {
    setQuantity(num)
    setParam(num, "maxData")
  }

  return (
      <div className="mt-1">
        Max elements per side
        <div className="flex flex-row">
          <div
              className={cn(defaultClass, "border-y border-l rounded-l-lg", quantity === '10' && "text-primary-foreground bg-primary")}
              onClick={() => handleChange('10')}
          >
            10
          </div>
          <div
              className={cn(defaultClass, "border", quantity === '20' && "text-primary-foreground bg-primary")}
              onClick={() => handleChange('20')}
          >
            20
          </div>
          <div
              className={cn(defaultClass, "border-y border-r rounded-r-lg", quantity === '30' && "text-primary-foreground bg-primary")}
              onClick={() => handleChange('30')}
          >
            30
          </div>
        </div>
      </div>
  )
}