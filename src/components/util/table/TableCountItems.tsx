import {useContext} from "react";
import {ParamContext} from "@/context/ParamContext.tsx";

export default function TableCountItems({count}: { count: number }) {

  const {page, maxData} = useContext(ParamContext)
  const calcItems = (page: number) => {
    const result = Number(maxData) * (Number(page))
    return result > count ? count : result + 1
  }

  return (
      <>
        {!!count &&
            <span>
                {`Showing ${calcItems(Number(page) - 1)}
                to ${page === `${Math.ceil(count / Number(maxData))}` ? count : calcItems(Number(page)) - 1}
                of ${count} row(s).`}
            </span>
        }
        {!count && null}
      </>
  )
}