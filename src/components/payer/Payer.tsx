import {Button} from "@/components/ui/button.tsx";
import usePayer from "@/hooks/payer/usePayer.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import EditPayerForm from "@/components/payer/edit/EditPayerForm.tsx";
import {Loader2} from "lucide-react";
import ActiveInactive from "@/components/payer/util/ActiveInactive.tsx";

export default function Payer() {
  const {getPayerData, payerData, payerLoading} = usePayer()

  return (
      <div className="flex flex-col justify-center items-center">
        <div className="border p-3 rounded-2xl shadow-2xl	w-80">
          {payerLoading &&
              <div className="flex items-center justify-center">
                  <span className="text-lg font-medium">Loading</span>
                  <Loader2 className="ml-2 animate-spin"/>
              </div>
          }
          {!payerLoading && payerData?.id &&
              <>
                  <h2 className="text-3xl font-bold text-center border-b border-black p-2">{payerData?.payer_name}</h2>
                  <div className="border-b border-black pb-3">
                      <p className="font-semibold flex gap-2 items-center mt-3 mb-1">
                          Active:
                        <ActiveInactive active={payerData.active}/>
                      </p>
                      <span className="font-semibold">Payment time: <span
                          className="font-normal">{payerData?.payment_time} month</span></span>
                  </div>
                  <div className="mt-2">
                      <p className="font-semibold">Description</p>
                      <p className="mt-1">{payerData?.description}</p>
                  </div>
                  <div className="mt-2 flex justify-end">
                      <Dialog>
                          <DialogTrigger asChild>
                              <Button>Edit</Button>
                          </DialogTrigger>
                          <DialogContent>
                              <DialogHeader>
                                  <DialogTitle>Change info</DialogTitle>
                                  <DialogDescription>
                                      Edit payer data.
                                  </DialogDescription>
                              </DialogHeader>
                            {payerData &&
                                <EditPayerForm
                                    payerData={payerData}
                                    getPayerData={getPayerData}
                                />
                            }
                          </DialogContent>
                      </Dialog>
                  </div>
              </>
          }
          {!payerData?.id && !payerLoading &&
              <div className="text-center">
                  No data
              </div>
          }
        </div>
      </div>
  )
}