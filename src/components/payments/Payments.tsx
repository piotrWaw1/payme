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
import useHistory from "@/hooks/useHistory.tsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import {supabaseClient} from "@/clientDef.ts";

export default function Payments() {
  const {historyData} = useHistory()

  const paymentDelete = async (id: number) => {
    const {error} = await supabaseClient.from('payments_history').delete().eq('id', id)
    console.log(error)
  }
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
            {historyData?.map(element=>(
                <TableRow key={element.id}>
                  <TableCell className="font-medium">{element.id}</TableCell>
                  <TableCell className="text-center">{element.payers?.payer_name}</TableCell>
                  <TableCell className="text-center">{element.date}</TableCell>
                  <TableCell className="text-center">{element.price} PLN</TableCell>
                  <TableCell className="text-center">
                    <Button>Edit</Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="ml-3 bg-red-600 text-white font-semibold p-2 rounded-md hover:bg-red-700">Delete</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are sure you want to delete payment {element.date}?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete payer and all their data.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">Close</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button type="button" onClick={() => paymentDelete(element.id)}>Delete</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
  )
}