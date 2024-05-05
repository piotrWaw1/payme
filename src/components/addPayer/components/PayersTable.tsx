import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";


const historyData = [{
  id: 1,
  payer_name: "Roman",
  active: true,
},
  {
    id: 2,
    payer_name: "Tomek",
    active: false,
  },
  {
    id: 3,
    payer_name: "Piotrek",
    active: true,
  }
]

export default function PayersTable(){
  return(
      <Table className="border-2 ">
        <TableCaption>A list of all payers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead className="text-center">Payer name</TableHead>
            <TableHead className="text-center">Active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {historyData?.length !== 0 ? historyData?.map(element => (
                  <TableRow key={element.id}>
                    <TableCell className="font-medium">{element.id}</TableCell>
                    <TableCell className="text-center">{element.payer_name}</TableCell>
                    <TableCell className="text-center pl-1">
                      <Checkbox checked={element.active}/>
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