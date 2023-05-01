import { IconButton, InputBase } from '@mui/material'
import styled from 'styled-components'
import { Search } from '@styled-icons/evaicons-solid/Search'
import { useState } from 'react'

const Layout = styled.div`
  display: flex;
  width: 350px;
  padding: 2px 2px 2px 12px;
  gap: 8px;
  justify-self: center;
  justify-content: space-between;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
`

export const Searchbar = ({ onClick }) => {
  const [value, setValue] = useState('')
  
  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      onClick(value)
    }
  }

  return (
    <Layout>
      <InputBase
        placeholder="Search pokemon (ID or name)"
        value={value}
        onChange={event => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        style={{ width: '100%' }}
      />
      <IconButton 
        type="button" 
        sx={{ p: '10px' }}
        aria-label="search"
        onClick={() => onClick(value)}
      >
        <Search size={16} />
      </IconButton>
    </Layout>
  )
}