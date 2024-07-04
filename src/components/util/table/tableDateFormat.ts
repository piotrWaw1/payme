import {format} from "date-fns";

const dateFormat = (date: string) => {
  return format(new Date(date), 'dd-MM-yyyy')
}

export default dateFormat