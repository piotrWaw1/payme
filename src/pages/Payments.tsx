import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx"
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import TableLoadingComponent from "@/components/util/TableLoadingComponent.tsx";
import NoDataTableRow from "@/components/util/NoDataTableRow.tsx";
import DeleteButton from "@/components/util/DeleteButton.tsx";
import {useEffect} from "react";
import PaginationUtil from "@/components/util/pagination/PaginationUtil.tsx";
import dateFormat from "@/components/util/table/tableDateFormat.ts";
import MaxElements from "@/components/util/pagination/MaxElements.tsx";
import NameSearch from "@/components/payer/tableFilters/NameSearch.tsx";
import TableCountItems from "@/components/util/table/TableCountItems.tsx";
import DateRangeFilter from "@/components/payments/tableFilters/DateRangeFilter.tsx";
import {Pencil, Plus} from "lucide-react";
import useTableFilterQuery from "@/hooks/tableFilters/useTableFilterQuery.tsx";

interface PaymentsData {
  id: number;
  user_id: string;
  price: number;
  date: string;
  payers: {
    payer_name: string;
  } | null;
}

const TABLE = 'payments_history'
const FILTERS = ['name', 'dateRange', 'order']
const COLUMNS = 'id, user_id, price, date, payers (payer_name)'

export default function Payments() {

  // const {getPaymentData, tableData, loading} = useTableFilters()
  const {getData, loading, tableData} = useTableFilterQuery()
  const {data, count} = tableData
  const paymentsData = data as PaymentsData[]

  useEffect(() => {
    getData(TABLE, FILTERS, COLUMNS).then()
  }, [getData]);
  return (
      <>
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold mb-3 dark:text-slate-200">List of all payments</h2>
          <div>
            <Link to={"add"} tabIndex={-1}>
              <Button className=" bg-green-600 hover:bg-green-500 dark:text-white">
                <Plus/>
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <NameSearch name="name"/>
          <div className="flex gap-4">
            <DateRangeFilter/>
          </div>
        </div>
        <Table className="border-2 dark:border-slate-500 dark:bg-slate-700 dark:text-white mb-32">
          <TableCaption>
            <div className="flex justify-between">
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
              <TableHead className="text-center">Date</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!loading && paymentsData?.map(element => (
                <TableRow className="dark:border-slate-500" key={element.id}>
                  <TableCell className="text-start">{element.payers?.payer_name}</TableCell>
                  <TableCell className="text-center">{dateFormat(element.date)}</TableCell>
                  <TableCell className="text-center">{element.price} PLN</TableCell>
                  <TableCell className="text-end">
                    <Link to={`${element.id}`} tabIndex={-1}>
                      {/*<Button className="mr-2">Edit</Button>*/}
                      <Button type="button" className="bg-transparent hover:bg-primary group">
                        <Pencil className="text-primary group-hover:text-secondary"/>
                      </Button>
                    </Link>
                    <DeleteButton
                        title={`Are you sure you want to delete ${element.date}?`}
                        description={"This action cannot be undone. This will permanently delete payer and all their data"}
                        elementId={`${element.id}`}
                        table={"payments_history"}
                        getNewData={() => getData(TABLE, FILTERS, COLUMNS).then()}
                    />
                  </TableCell>
                </TableRow>
            ))}
            {loading &&
                <TableLoadingComponent span={4}/>
            }
            {!loading && data?.length === 0 &&
                <NoDataTableRow span={4}/>
            }
          </TableBody>
        </Table>

      </>
  )
}