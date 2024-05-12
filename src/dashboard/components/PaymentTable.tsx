import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useHistory from "@/hooks/useHistory.tsx";

export default function PaymentTable() {
  const {historyData} = useHistory()

  return (
      <Table className="border-2 ">
        <TableCaption>A list of all payments</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead className="text-center">Payer</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {historyData?.length !== 0 ? historyData?.map(element => (
                  <TableRow key={element.id}>
                    <TableCell className="font-medium">{element.id}</TableCell>
                    <TableCell className="text-center">{element.payers?.payer_name}</TableCell>
                    <TableCell className="text-center">{element.date}</TableCell>
                    <TableCell className="text-right">{element.price} PLN</TableCell>
                  </TableRow>
              )) :
              <TableRow>
                <TableCell colSpan={4} className="font-medium text-center">No data</TableCell>
              </TableRow>
          }
        </TableBody>
      </Table>
  )
}