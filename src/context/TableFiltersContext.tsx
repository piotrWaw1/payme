import {Tables} from "../../supabase.ts";
import {createContext, FC, ReactNode, useCallback, useContext, useState} from "react";
import {supabaseClient} from "@/clientDef.ts";
import {ParamContext} from "@/context/ParamContext.tsx";

interface TableData {
  count: number;
  data: (Tables<'payments_history'> | Tables<'payers'>)[] | null;
}

type TableType = 'payers' | 'payments_history'

interface PayersFiltersContextData {
  tableData: TableData;
  loading: boolean;
  getPayersData: (table: TableType) => void;
  filterName: () => void
}

const DEFAULT_DATA = {
  count: 0,
  data: []
}

export const TableFiltersContext = createContext<PayersFiltersContextData>({
  tableData: DEFAULT_DATA,
  loading: false,
  getPayersData: () => undefined,
  filterName: ()=>undefined
})

export const TableFiltersProvider: FC<{ children: ReactNode }> = ({children}) => {
  const [tableData, setTableData] = useState<TableData>(DEFAULT_DATA)
  const [loading, setLoading] = useState(false)
  const {page, maxData, active, time, name} = useContext(ParamContext)

  const getPayersData = useCallback(async (table: TableType) => {
    setLoading(true)

    const startData = Number(maxData) * (Number(page) - 1)
    const endData = (Number(maxData) * Number(page)) - 1

    let query = supabaseClient.from(table)
        .select('*', {count: 'exact'})
        .range(startData, endData)
    if (active !== 'all') {
      query = query.eq('active', active)
    }
    if (time !== 'all') {
      query = query.eq('payment_time', time)
    }
    const {data, count} = await query
    // const {data, count} = await supabaseClient.from(table)
    //     .select('*', {count: 'exact'})
    //     .range(startData, endData)

    setTableData({data, count: count || 0})
    setLoading(false)
  }, [active, maxData, page, time])

  const filterName = useCallback(async () => {
    setLoading(true)
    const {data, count} = await supabaseClient.from('payers')
        .select('*', {count: "exact"})
        .filter('payer_name', 'ilike', `%${name}%`)
    setTableData({data, count: count || 0})
    setLoading(false)
  }, [name])

  const contextData = {
    tableData,
    loading,
    getPayersData,
    filterName
  }

  return (
      <TableFiltersContext.Provider value={contextData}>
        {children}
      </TableFiltersContext.Provider>
  )
}