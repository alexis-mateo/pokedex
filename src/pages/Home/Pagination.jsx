import {
  FormControl, InputLabel, MenuItem, Pagination as MuiPagination, Select, 
} from '@mui/material'
import styled from 'styled-components'

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding-bottom: 20px;
`

export const Pagination = ({
  disabled, page, setPage, pageSize, setPageSize, MAX_POKEMON_ID,
}) => (
  <Layout>
    <MuiPagination 
      count={Math.floor(MAX_POKEMON_ID / pageSize) + 1} 
      page={page} 
      onChange={(event, value) => setPage(value)}
      disabled={disabled}
    />
    <FormControl sx={{ m: 1 }} size="small">
      <InputLabel id="select-small-label">Size</InputLabel>
      <Select
        labelId="select-small-label"
        id="select-pagesize"
        value={pageSize}
        label="Size"
        onChange={event => setPageSize(event.target.value)}
        disabled={disabled}
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={30}>30</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={100}>100</MenuItem>
      </Select>
    </FormControl>
  </Layout>
)