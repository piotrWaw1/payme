import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card.tsx";
import TableLoadingComponent from "@/components/util/TableLoadingComponent.tsx";
import {Link} from "react-router-dom";
import NoDataTableRow from "@/components/util/NoDataTableRow.tsx";
import DeleteButton from "@/components/util/DeleteButton.tsx";
import ActiveInactive from "@/components/payer/util/ActiveInactive.tsx";
import PaginationUtil from "@/components/util/pagination/PaginationUtil.tsx";
import {useEffect} from "react";
import {Tables} from "../../supabase.ts";
import NameSearch from "@/components/payer/tableFilters/NameSearch.tsx";
import MaxElements from "@/components/util/pagination/MaxElements.tsx";
import TableCountItems from "@/components/util/table/TableCountItems.tsx";
import {Info, Plus} from 'lucide-react';
import {SelectComponent} from "@/components/payer/util/SelectComponent.tsx";
import useTableFilterQuery from "@/hooks/tableFilters/useTableFilterQuery.tsx";

const TABLE = 'payers'
const FILTERS = ['name', 'active', 'time']

export default function Payers() {

  // const {getPayers, payersData, payersLoading} = usePayers("all")
  // const {tableData, getPayersData, loading} = useTableFilters()
  const {getData, loading, tableData} = useTableFilterQuery()
  const {data, count} = tableData
  const payersData = data as Tables<"payers">[]

  useEffect(() => {
    getData(TABLE, FILTERS).then()
  }, [getData]);

  return (
      <>
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold mb-3 dark:text-slate-200">List of payers</h2>
          <div>
            <Link to={"add"} tabIndex={-1}>
              <Button className=" bg-green-600 hover:bg-green-500 dark:text-white">
                <Plus/>
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-between mb-5">
          <NameSearch name="name"/>
          <div className="flex gap-4">
            <SelectComponent
                label="Payment time filter"
                placeholder="Payment time"
                propsName="time"
                values={[
                  {value: 'all', title: 'All'},
                  {value: '1', title: '1 month'},
                  {value: '2', title: '2 months'},
                  {value: '3', title: '3 months'}
                ]}
            />
            <SelectComponent
                label="Payer active filter"
                placeholder="Payer active"
                propsName="active"
                values={[
                  {value: 'all', title: 'All'},
                  {value: 'true', title: 'Active', className: 'text-green-600 dark:text-green-500'},
                  {value: 'false', title: 'Inactive', className: 'text-red-600 dark:text-rose-500'}]}
            />
          </div>
        </div>
        <Table className="border-2 dark:border-slate-500 dark:bg-slate-700 dark:text-white mb-32">
          <TableCaption>
            <div className="flex justify-between items-center h-auto">
              <div className="flex flex-col items-start">
                <TableCountItems count={count}/>
              </div>
              <MaxElements/>
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
                    <TableCell className="text-end">
                      <Link to={`${element.id}`} tabIndex={-1}>
                        <Button type="button" className="bg-transparent hover:bg-primary group">
                          <Info className="text-primary group-hover:text-secondary"/>
                        </Button>
                      </Link>
                      <DeleteButton
                          title={`Are you sure you want to delete ${element.payer_name}?`}
                          description={"This action cannot be undone. This will permanently delete payer and all their data"}
                          elementId={`${element.id}`}
                          table={'payers'}
                          getNewData={() => getData(TABLE, FILTERS).then()}
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