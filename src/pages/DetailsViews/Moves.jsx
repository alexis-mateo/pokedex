import { useParams } from "react-router"
import useSWR from 'swr'
import { DataGrid } from '@mui/x-data-grid';

import { useRowsMoves } from "../../hook/useRowsMoves";

const columns = [
  { field: 'name', headerName: 'Name' },
  { field: 'type', headerName: 'Type' },
  { field: 'category', headerName: 'Category' },
  { field: 'power', headerName: 'Power' },
  { field: 'accuracy', headerName: 'Accuracy' },
  { field: 'pp', headerName: 'PP' },
]

export const Moves = () => {
  const { id } = useParams()
  const rows = useRowsMoves(id)

  return (
    <DataGrid
      rows={rows ?? []}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5,10, 20, 40]}
      loading={!rows}
      pagination={true}
      
    />
  )
}