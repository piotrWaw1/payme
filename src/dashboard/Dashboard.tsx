import PaymentTable from "@/dashboard/components/PaymentTable.tsx";
import Calendar from "@/dashboard/components/Calendar.tsx";

export default function Dashboard() {
  return (
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-2">
          <PaymentTable/>
        </div>
        <div className="col-span-4">
          <Calendar/>
        </div>
      </div>
  )
}