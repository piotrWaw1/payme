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
import {useEffect} from "react";
import dateFormat from "@/components/util/tableDateFormat.ts";

export default function PaymentTable() {
  const {historyData, historyLoading, getNewest} = useHistory()
  const {data} = historyData
  useEffect(() => {
    void getNewest()
  }, [getNewest]);



  return (
      <Table className="border-2 ">
        <TableCaption>List of 10 latest payments</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-start">Payer</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {historyData?.data?.length !== 0 && data?.map(element => (
                  <TableRow key={element.id}>
                    <TableCell className="text-start">{element.payers?.payer_name}</TableCell>
                    <TableCell className="text-center">{dateFormat(element.date)}</TableCell>
                    <TableCell className="text-right">{element.price} PLN</TableCell>
                  </TableRow>
              )
          )
          }
          {!data?.length && !historyLoading &&
              <NoDataTableRow span={4}/>
          }
          {historyLoading &&
              <TableLoadingComponent span={4}/>
          }
        </TableBody>
      </Table>
  )
}