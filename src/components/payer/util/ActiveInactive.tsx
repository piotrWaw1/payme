import {Check, X} from 'lucide-react';


export default function ActiveInactive({active}: { active: boolean }) {
  return (
      <>
        {active && <Check className="text-green-600 dark:text-green-600 inline"/>}
        {!active && <X className="text-red-600 dark:text-red-600 inline"/>}
      </>

  )
}