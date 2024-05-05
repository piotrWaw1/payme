import PaymentTable from "@/dashboard/components/PaymentTable.tsx";
import Calendar from "@/dashboard/components/Calendar.tsx";

export default function Dashboard() {
  return (
      <div className="grid lg:grid-cols-12 gap-4">
        <div className="border-b-2 lg:col-span-5 lg:border-2 lg:p-5 lg:rounded-l-3xl">
          <h2 className="text-3xl font-bold mb-3">List of payments</h2>
          <PaymentTable/>
        </div>
        <div className="lg:col-span-7 lg:p-5 lg:border-2 lg:rounded-r-3xl">
          <h2  className="text-3xl font-bold mb-3">Calendar</h2>
          <Calendar/>
        </div>
      </div>
  )
}