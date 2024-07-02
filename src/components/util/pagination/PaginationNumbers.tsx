import {PaginationItem, PaginationLink} from "@/components/ui/pagination.tsx";
import {useContext, useEffect, useState} from "react";
import {ParamContext} from "@/context/ParamContext.tsx";
import {cn} from "@/lib/utils.ts";

const PaginationNumbers = ({pagesNumber}: { pagesNumber: number }) => {
  const [pages, setPages] = useState<number[]>([])
  const {page, setPage} = useContext(ParamContext)

  useEffect(() => {
    setPages([...Array(pagesNumber).keys()].map(x => x + 1))
  }, [pagesNumber]);

  return (

      pages.map(p => (
          <PaginationItem key={p}>
            <PaginationLink
                isActive={`${p}` === page}
                className={cn("cursor-pointer", `${p}` === page && "bg-primary text-secondary")}
                onClick={() => setPage(`${p}`)}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
      ))

  )
}

export default PaginationNumbers