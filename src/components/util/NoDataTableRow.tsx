import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {FC} from "react";

interface NoDataTableCellProps {
  span: number;
}

const NoDataTableRow: FC<NoDataTableCellProps> = ({span}) => {
  return (
      <TableRow>
        <TableCell colSpan={span} className="font-bold text-center">
          No data
        </TableCell>
      </TableRow>
  )
}

export default NoDataTableRow