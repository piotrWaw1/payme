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
      <div className="flex flex-col justify-center items-center ">
        <div className="border p-3 rounded-2xl shadow-2xl dark:shadow-slate-800	w-80 dark:bg-slate-700">
          {payerLoading &&
              <div className="flex items-center justify-center">
                  <span className="text-lg font-medium dark:text-slate-300">Loading</span>
                  <Loader2 className="ml-2 animate-spin"/>
              </div>
          }
          {!payerLoading && payerData?.id &&
              <>
                  <h2 className="text-3xl font-bold text-center border-b-2 border-black dark:border-slate-500 p-2 dark:text-slate-200">{payerData?.payer_name}</h2>
                  <div className="border-b-2 border-black dark:border-slate-500 pb-3">
                      <p className="font-semibold flex gap-2 items-center mt-3 mb-1 dark:text-slate-300">
                          Active:
                          <ActiveInactive active={payerData.active}/>
                      </p>
                      <span className="font-semibold dark:text-slate-300">Payment time: <span
                          className="font-normal dark:text-slate-300">{payerData?.payment_time} month</span></span>
                  </div>
                  <div className="mt-2">
                      <p className="font-semibold dark:text-slate-300">Description</p>
                      <p className="mt-1 dark:text-slate-300">{payerData?.description}</p>
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