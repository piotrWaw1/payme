export default function ActiveInactive({active}: { active: boolean }) {
  return (
      <>
        {active && <span className="text-green-600 font-bold dark:text-green-500">Active</span>}
        {!active && <span className="text-red-600 font-bold dark:text-red-500">Inactive</span>}
      </>

  )
}