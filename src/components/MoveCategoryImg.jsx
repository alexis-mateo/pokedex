import { Tooltip } from '@mui/material'
import { useMoveCategory } from '../hook/useMoveCategory'

export const MoveCategoryImg = ({ category }) => {
  const img = useMoveCategory(category)
  return(
    <Tooltip title={category} arrow>
      <img src={img} style={{ height: '24px' }} />
    </Tooltip>
  )
}