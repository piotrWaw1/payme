import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import usePayers from "@/hooks/usePayers.tsx";


export default function PayersTable() {

  const {payersData} = usePayers()

  return (
      <Table className="border-2 ">
        <TableCaption>A list of all payers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead className="text-center">Payer name</TableHead>
            <TableHead className="text-center">Payment time</TableHead>
            <TableHead className="text-center">Active</TableHead>
            <TableHead className="text-center"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payersData?.length !== 0 ? payersData?.map(element => (
                  <TableRow key={element.id}>
                    <TableCell className="font-medium">{element.id}</TableCell>
                    <TableCell className="text-center">{element.payer_name}</TableCell>
                    <TableCell className="text-center">{element.payment_time}</TableCell>
                    <TableCell className="text-center pl-1">
                      <Checkbox checked={element.active}/>
                    </TableCell>
                    <TableCell className="text-center">
                      <button className="bg-red-600 text-white font-semibold p-2 rounded-md">Delete</button>
                    </TableCell>
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