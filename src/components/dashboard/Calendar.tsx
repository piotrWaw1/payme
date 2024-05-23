const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
export default function Calendar() {
  return (
      <div className="grid grid-cols-12 gap-2">
        {MONTHS.map(month => (
            <div className="col-span-4 bg-blue-600 rounded-md" key={month}>
              <p className="pl-2 text-white mt-1 font-semibold text-lg">{month}</p>
              <div className="border rounded m-2 pl-1 pb-1 bg-white">payer 1</div>
            </div>
        ))}
      </div>
  )
}