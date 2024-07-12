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
import { Trash2 } from 'lucide-react';

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
          <Button className="bg-transparent transition ease-in-out delay-150 hover:bg-destructive dark:hover:bg-red-600 group">
            <Trash2 className="text-rose-500 transition ease-in-out delay-150 group-hover:text-white"/>
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
              <Button variant="destructive" type="button" className="dark:bg-red-600" onClick={() => deleteAction(elementId)}>Delete</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}

export default DeleteButton