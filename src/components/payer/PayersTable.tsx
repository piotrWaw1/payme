import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import usePayers from "@/hooks/usePayers.tsx";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx"
import {Button} from "@/components/ui/button.tsx";
import {supabaseClient} from "@/clientDef.ts";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card.tsx";
import TableLoadingComponent from "@/components/util/TableLoadingComponent.tsx";
import {Link} from "react-router-dom";

export default function PayersTable() {

  const {getPayers, payersData, payersLoading} = usePayers()

  const payerDelete = async (id: number) => {
    const {error} = await supabaseClient.from('payers').delete().eq('id', id)
    void getPayers()
    console.log(error)
  }

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
          {payersData?.length !== 0 && payersData?.map(element => (
              <HoverCard key={element.id}>
                <TableRow>
                  <TableCell className="font-medium">{element.id}</TableCell>
                  <TableCell className="text-center">
                    <HoverCardTrigger>
                      {element.payer_name}
                    </HoverCardTrigger>
                  </TableCell>
                  <TableCell className="text-center">{element.payment_time}</TableCell>
                  <TableCell className="text-center pl-1">
                    <Checkbox checked={element.active}/>
                  </TableCell>
                  <TableCell className="text-center">
                    <Link to={`${element.id}`}>
                      <Button type="button" className="mr-2">Info</Button>
                    </Link>
                    <Dialog>
                      <DialogTrigger className="bg-red-600 text-white font-semibold p-2 rounded-md">
                        Delete
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are sure you want to delete payer {element.payer_name}?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete payer and all their data.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">Close</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button type="button" onClick={() => payerDelete(element.id)}>Delete</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
                <HoverCardContent>
                  <h3 className="font-bold text-base mb-1">Description</h3>
                  <p>{element.description}</p>
                </HoverCardContent>
              </HoverCard>
          ))}
          {!payersData?.length && !payersLoading &&
              <TableRow>
                  <TableCell colSpan={5} className="font-medium text-center">No data</TableCell>
              </TableRow>
          }
          {payersLoading &&
              <TableLoadingComponent span={5}/>
          }
        </TableBody>
      </Table>
  )
}