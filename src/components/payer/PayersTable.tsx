import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import usePayers from "@/hooks/usePayers.tsx";
import {Button} from "@/components/ui/button.tsx";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card.tsx";
import TableLoadingComponent from "@/components/util/TableLoadingComponent.tsx";
import {Link} from "react-router-dom";
import NoDataTableRow from "@/components/util/NoDataTableRow.tsx";
import DeleteButton from "@/components/util/DeleteButton.tsx";

export default function PayersTable() {

  const {getPayers, payersData, payersLoading} = usePayers("all")

  return (

      <Table className="border-2 ">
        <TableCaption>A list of all payers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
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
                    <DeleteButton
                        title={`Are you sure you want to delete ${element.payer_name}?`}
                        description={"This action cannot be undone. This will permanently delete payer and all their data"}
                        elementId={`${element.id}`}
                        table={'payers'}
                        getNewData={getPayers}
                    />
                  </TableCell>
                </TableRow>
                <HoverCardContent>
                  <h3 className="font-bold text-base mb-1">Description</h3>
                  <p>{element.description}</p>
                </HoverCardContent>
              </HoverCard>
          ))}
          {!payersData?.length && !payersLoading &&
              <NoDataTableRow span={5}/>
          }
          {payersLoading &&
              <TableLoadingComponent span={5}/>
          }
        </TableBody>
      </Table>
  )
}