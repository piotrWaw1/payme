import {FC} from "react";
import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {Loader2} from "lucide-react";

interface TableLoadingComponentProps {
  span: number;
}

const TableLoadingComponent: FC<TableLoadingComponentProps> = ({span}) => (
    <TableRow>
      <TableCell colSpan={span} className="text-center">
        <p className="flex items-center justify-center text-base font-semibold">
          <span className="mr-3">Loading</span>
          <Loader2 className="animate-spin"/>
        </p>
      </TableCell>
    </TableRow>
)

export default TableLoadingComponent