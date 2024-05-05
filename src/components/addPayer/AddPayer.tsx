import PayersTable from "@/components/addPayer/components/PayersTable.tsx";
import AddPayerForm from "@/components/addPayer/components/AddPayerForm.tsx";

export default function AddPayer() {

  return (
      <div className="grid lg:grid-cols-7 gap-4">
        <div className="lg:col-span-3">
          <h2 className="text-3xl font-bold mb-3">List of payers</h2>
          <PayersTable/>
        </div>
        <div className="flex justify-center lg:col-span-4">
          <div className="w-96">
            <h2 className="text-3xl font-bold mb-3">Add new payer</h2>
            <AddPayerForm/>
          </div>
        </div>
      </div>
  )
}