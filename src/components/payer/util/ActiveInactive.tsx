export default function ActiveInactive({active}: { active: boolean }) {
  return (
      <>
        {active && <span className="text-green-600 font-bold">Active</span>}
        {!active && <span className="text-red-600 font-bold">Inactive</span>}
      </>

  )
}