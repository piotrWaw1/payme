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
import {Button} from "@/components/ui/button.tsx";
import {supabaseClient} from "@/clientDef.ts";
import {FC} from "react";

type AllowedTabs = "payers" | "payments_history";

interface DeleteDialogProps {
  title: string;
  description: string;
  elementId: string;
  table: AllowedTabs;
  getNewData: () => void;
}

const DeleteButton: FC<DeleteDialogProps> = (props) => {
  const {title, description, elementId, table, getNewData} = props
  const deleteAction = async (id: string) => {
    const {error} = await supabaseClient.from(table).delete().eq('id', id)
    void getNewData()
    console.log(error)
  }

  return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Close</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" onClick={() => deleteAction(elementId)}>Delete</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}

export default DeleteButton