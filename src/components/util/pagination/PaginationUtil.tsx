import {
  Pagination,
  PaginationContent,
  // PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.tsx"
import {FC, useContext} from "react";
import {ParamContext} from "@/context/ParamContext.tsx";
import PaginationNumbers from "@/components/util/pagination/PaginationNumbers.tsx";

interface PaginationUtilProps {
  count: number;
}

const PaginationUtil: FC<PaginationUtilProps> = ({count}) => {

  const {page, maxData, setPage} = useContext(ParamContext)
  const maxPages = Math.ceil(count / Number(maxData))

  const previous = () => {
    const previousPage = Number(page) - 1
    if (previousPage > 0) {
      setPage(`${previousPage}`)
    }
  }

  const next = () => {
    const nextPage = Number(page) + 1
    if (maxPages >= nextPage) {
      setPage(`${nextPage}`)
    }
  }

  return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
                onClick={previous}
                className="cursor-pointer"
            />
          </PaginationItem>
          <PaginationNumbers pagesNumber={maxPages}/>
          {/*<PaginationItem>*/}
          {/*  <PaginationEllipsis/>*/}
          {/*</PaginationItem>*/}
          <PaginationItem>
            <PaginationNext
                onClick={next}
                className="cursor-pointer"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
  )
}

export default PaginationUtil