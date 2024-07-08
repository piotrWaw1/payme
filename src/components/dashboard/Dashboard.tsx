import PaymentTable from "@/components/dashboard/PaymentTable.tsx";
import Calendar from "@/components/dashboard/Calendar/Calendar.tsx";

export default function Dashboard() {
  return (
      <div className="grid lg:grid-cols-12 gap-4">
        <div className="border-b-2 lg:col-span-5 lg:border-2 lg:p-5 lg:rounded-l-3xl dark:border-slate-500">
          <h2 className="text-3xl font-bold mb-3 dark:text-slate-200">List of payments</h2>
          <PaymentTable/>
        </div>
        <div className="lg:col-span-7 lg:p-5 lg:border-2 lg:rounded-r-3xl dark:border-slate-500">
          <h2  className="text-3xl font-bold mb-3 dark:text-slate-200">Calendar</h2>
          <Calendar/>
        </div>
      </div>
  )
}