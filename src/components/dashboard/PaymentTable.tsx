import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx"
import useHistory from "@/hooks/payment/useHistory.tsx";
import TableLoadingComponent from "@/components/util/TableLoadingComponent.tsx";
import NoDataTableRow from "@/components/util/NoDataTableRow.tsx";

export default function PaymentTable() {
  const {historyData, historyLoading} = useHistory()
  let id = 0
  return (
      <Table className="border-2 ">
        <TableCaption>List of all payments for the current month</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead className="text-center">Payer</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {historyData?.length !== 0 && historyData?.map(element => {
            id += 1
            return (
                <TableRow key={element.id}>
                  <TableCell className="font-medium">{id}</TableCell>
                  <TableCell className="text-center">{element.payers?.payer_name}</TableCell>
                  <TableCell className="text-center">{element.date}</TableCell>
                  <TableCell className="text-right">{element.price} PLN</TableCell>
                </TableRow>
            )
          })
          }
          {!historyData?.length && !historyLoading &&
              <NoDataTableRow span={4}/>
          }
          {historyLoading &&
              <TableLoadingComponent span={4}/>
          }
        </TableBody>
      </Table>
  )
}