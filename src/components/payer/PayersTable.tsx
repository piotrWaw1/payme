import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import usePayers from "@/hooks/payer/usePayers.tsx";
import {Button} from "@/components/ui/button.tsx";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card.tsx";
import TableLoadingComponent from "@/components/util/TableLoadingComponent.tsx";
import {Link} from "react-router-dom";
import NoDataTableRow from "@/components/util/NoDataTableRow.tsx";
import DeleteButton from "@/components/util/DeleteButton.tsx";
import ActiveInactive from "@/components/payer/util/ActiveInactive.tsx";
import PaginationUtil from "@/components/util/pagination/PaginationUtil.tsx";

export default function PayersTable() {

  const {getPayers, payersData, payersLoading} = usePayers("all")
  const {data, count} = payersData
  return (
      <>
        <Table className="border-2 ">
          <TableCaption>A list of all payers</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-start">Payer name</TableHead>
              <TableHead className="text-center">Payment time</TableHead>
              <TableHead className="text-center">Active</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.length !== 0 && data?.map(element => (
                <HoverCard key={element.id}>
                  <TableRow>
                    <TableCell className="text-start">
                      <HoverCardTrigger>
                        {element.payer_name}
                      </HoverCardTrigger>
                    </TableCell>
                    <TableCell className="text-center">
                      {`${element.payment_time} month`}
                      {element.payment_time > 1 && "s"}
                    </TableCell>
                    <TableCell className="text-center">
                      <ActiveInactive active={element.active}/>
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
            {!data?.length && !payersLoading &&
                <NoDataTableRow span={5}/>
            }
            {payersLoading &&
                <TableLoadingComponent span={5}/>
            }
          </TableBody>
        </Table>
        { !!count &&
            <PaginationUtil count={count} maxDisplay={10}/>
        }
      </>
  )
}