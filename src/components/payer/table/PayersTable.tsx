import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card.tsx";
import TableLoadingComponent from "@/components/util/TableLoadingComponent.tsx";
import {Link} from "react-router-dom";
import NoDataTableRow from "@/components/util/NoDataTableRow.tsx";
import DeleteButton from "@/components/util/DeleteButton.tsx";
import ActiveInactive from "@/components/payer/util/ActiveInactive.tsx";
import PaginationUtil from "@/components/util/pagination/PaginationUtil.tsx";
import {useContext, useEffect} from "react";
import {ParamContext} from "@/context/ParamContext.tsx";
import {TableFiltersContext} from "@/context/TableFiltersContext.tsx";
import {Tables} from "../../../../supabase.ts";
import IsActiveFilter from "@/components/payer/table/IsActiveFilter.tsx";
import NameSearch from "@/components/payer/table/NameSearch.tsx";
import PaymentTimeFilter from "@/components/payer/table/PaymentTimeFilter.tsx";
import MaxElements from "@/components/util/pagination/MaxElements.tsx";


export default function PayersTable() {

  // const {getPayers, payersData, payersLoading} = usePayers("all")
  const {tableData, getPayersData, loading} = useContext(TableFiltersContext)
  const {data, count} = tableData
  const payersData = data as Tables<"payers">[]
  const {page, maxData} = useContext(ParamContext)

  const calcItems = (page: number) => {
    const result = Number(maxData) * (Number(page))
    return result > count ? count : result + 1
  }

  useEffect(() => {
    getPayersData('payers')
  }, [getPayersData]);
  return (
      <>
        <div className="flex justify-between mb-5">
          <NameSearch/>
          <div className="flex gap-4">
            <PaymentTimeFilter/>
            <IsActiveFilter/>
          </div>
        </div>
        <Table className="border-2 dark:border-slate-500 dark:bg-slate-700 dark:text-white">
          <TableCaption>
            <div className="flex justify-between">
              <div className="flex flex-col items-start">
                <span>Showing {calcItems(Number(page) - 1)} to {calcItems(Number(page)) - 1} of {count} row(s).</span>
                <MaxElements/>
              </div>
              <div>
                {!!count &&
                    <PaginationUtil count={count}/>
                }
              </div>
            </div>
          </TableCaption>
          <TableHeader>
            <TableRow className="dark:border-slate-500">
              <TableHead className="text-start">Payer name</TableHead>
              <TableHead className="text-center">Payment time</TableHead>
              <TableHead className="text-center">Active</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payersData?.length !== 0 && payersData?.map((element) => (
                <HoverCard key={element.id}>
                  <TableRow className="dark:border-slate-500">
                    <TableCell className="text-start">
                      <HoverCardTrigger>
                        {element.payer_name}
                      </HoverCardTrigger>
                    </TableCell>
                    <TableCell className="text-center">
                      {`${element.payment_time} month`}
                      {element.payment_time > 1 && "s"}
                    </TableCell>
                    <TableCell className="text-center">
                      <ActiveInactive active={element.active}/>
                    </TableCell>
                    <TableCell className="text-center">
                      <Link to={`${element.id}`}>
                        <Button type="button" className="mr-2">Info</Button>
                      </Link>
                      <DeleteButton
                          title={`Are you sure you want to delete ${element.payer_name}?`}
                          description={"This action cannot be undone. This will permanently delete payer and all their data"}
                          elementId={`${element.id}`}
                          table={'payers'}
                          getNewData={() => getPayersData("payers")}
                      />
                    </TableCell>
                  </TableRow>
                  <HoverCardContent>
                    <h3 className="font-bold text-base mb-1">Description</h3>
                    <p>{element.description}</p>
                  </HoverCardContent>
                </HoverCard>
            ))}
            {!data?.length && !loading &&
                <NoDataTableRow span={5}/>
            }
            {loading &&
                <TableLoadingComponent span={5}/>
            }
          </TableBody>
        </Table>
      </>
  )
}