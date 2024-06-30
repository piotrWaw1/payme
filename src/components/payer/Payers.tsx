import PayersTable from "@/components/payer/table/PayersTable.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";

export default function Payers() {

  return (
      <>
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold mb-3 dark:text-neutral-300">List of payers</h2>
          <div>
            <Link to={"add"}>
              <Button className=" bg-green-600 hover:bg-green-500">Add</Button>
            </Link>
          </div>
        </div>
        <PayersTable/>
      </>
  )
}