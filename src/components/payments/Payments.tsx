import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import useHistory from "@/hooks/payment/useHistory.tsx";
import TableLoadingComponent from "@/components/util/TableLoadingComponent.tsx";
import NoDataTableRow from "@/components/util/NoDataTableRow.tsx";
import DeleteButton from "@/components/util/DeleteButton.tsx";

export default function Payments() {
  const {getHistory, historyData, historyLoading} = useHistory()
  return (
      <>
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold mb-3">List of all payments</h2>
          <div>
            <Link to={"add"}>
              <Button className=" bg-green-600 hover:bg-green-500">Add</Button>
            </Link>
          </div>
        </div>
        <Table className="border-2">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead className="text-center">Payer name</TableHead>
              <TableHead className="text-center">Date</TableHead>
              <TableHead className="text-center">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!historyLoading && historyData?.map(element => (
                <TableRow key={element.id}>
                  <TableCell className="font-medium">{element.id}</TableCell>
                  <TableCell className="text-center">{element.payers?.payer_name}</TableCell>
                  <TableCell className="text-center">{element.date}</TableCell>
                  <TableCell className="text-center">{element.price} PLN</TableCell>
                  <TableCell className="text-center">
                    <Link to={`${element.id}`}>
                      <Button className="mr-2">Edit</Button>
                    </Link>
                    <DeleteButton
                        title={`Are you sure you want to delete ${element.date}?`}
                        description={"This action cannot be undone. This will permanently delete payer and all their data"}
                        elementId={`${element.id}`}
                        table={"payments_history"}
                        getNewData={getHistory}
                    />
                  </TableCell>
                </TableRow>
            ))}
            {historyLoading &&
                <TableLoadingComponent span={4}/>
            }
            {!historyLoading && historyData?.length === 0 &&
                <NoDataTableRow span={4}/>
            }
          </TableBody>
        </Table>
      </>
  )
}