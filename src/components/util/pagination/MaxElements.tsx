import {cn} from "@/lib/utils.ts";
import {useContext, useState} from "react";
import {ParamContext} from "@/context/ParamContext.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";

export default function MaxElements() {
  const {maxData, setParam} = useContext(ParamContext)
  const [quantity, setQuantity] = useState(maxData)
  const defaultClass = "flex items-center px-3 h-10 font-medium text-secondary-foreground bg-transparent" +
      "cursor-pointer ease-in duration-200 hover:bg-primary hover:text-primary-foreground"

  const handleChange = (num: string) => {
    setQuantity(num)
    setParam(num, "maxData")
  }

  return (
      <TooltipProvider>
        <Tooltip>
          <div>
            <TooltipTrigger>
              <div className="flex flex-row">

                <Button
                    className={cn(defaultClass, "border-y border-l rounded-r-none rounded-l-lg", quantity === '10' && "text-primary-foreground bg-primary")}
                    onClick={() => handleChange('10')}
                >
                  10
                </Button>

                <Button
                    className={cn(defaultClass, "border rounded-none", quantity === '20' && "text-primary-foreground bg-primary")}
                    onClick={() => handleChange('20')}
                >
                  20
                </Button>
                <Button
                    className={cn(defaultClass, "border-y border-r rounded-l-none rounded-r-lg", quantity === '30' && "text-primary-foreground bg-primary")}
                    onClick={() => handleChange('30')}
                >
                  30
                </Button>
              </div>
            </TooltipTrigger>
          </div>
          <TooltipContent>
            <p>Max elements per side</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
  )
}