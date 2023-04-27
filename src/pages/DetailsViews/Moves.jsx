import { useParams } from "react-router"
import { DataGrid } from '@mui/x-data-grid';

import { useRowsMoves } from "../../hook/useRowsMoves";
import { TypeIconLabel } from "../../components/TypeIconLabel";
import { MoveCategoryImg } from "../../components/MoveCategoryImg";

const columns = [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'type', headerName: 'Type', width: 120, renderCell: params => <TypeIconLabel type={params?.row?.type} /> },
  { field: 'category', headerName: 'Category', renderCell: params => <MoveCategoryImg category={params?.row?.category} /> },
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
      style={{ height: '400px' }}
      initialState={{
        sorting: {
          sortModel: [{ field: 'name', sort: 'asc' }],
        },
      }}
      
    />
  )
}