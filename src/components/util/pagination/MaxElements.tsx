import {cn} from "@/lib/utils.ts";
import {useContext} from "react";
import {ParamContext} from "@/context/ParamContext.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";

const PAGE_SIZE_OPITONS = [10, 20, 30];

// const a = PAGE_SIZE_OPITONS.at(-1);
// const b = PAGE_SIZE_OPITONS[PAGE_SIZE_OPITONS.length - 1];

export default function MaxElements() {
  const {maxData, setParam} = useContext(ParamContext)
  const defaultClass = "flex items-center px-3 h-10 font-medium text-secondary-foreground bg-transparent" +
      "cursor-pointer ease-in duration-200 hover:bg-primary hover:text-primary-foreground"

  const handleChange = (num: string) => {
    setParam(num, "maxData")
  }

  return (
      <TooltipProvider>
        <Tooltip>
          <div>
            <TooltipTrigger asChild>
              <div className="flex flex-row">
                {PAGE_SIZE_OPITONS.map((page, index) => (
                    <Button
                        key={`maxDataButton-${index}`}
                        className={cn(defaultClass,
                            "border rounded-none",
                            PAGE_SIZE_OPITONS.at(0) === page && "border-y border-l rounded-r-none rounded-l-lg",
                            PAGE_SIZE_OPITONS.at(-1) === page && "border-y border-r rounded-l-none rounded-r-lg",
                            maxData === `${page}` && "text-primary-foreground bg-primary")}
                        onClick={() => handleChange(`${page}`)}
                    >
                      {page}
                    </Button>
                ))}
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