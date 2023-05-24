import { useState } from 'react'
import useSWR from 'swr'
import { Card } from './Card'
import styled from 'styled-components'

import { Loader } from '../../components/Loader'
import { Pagination } from './Pagination'
import { useSearchParams } from 'react-router-dom'
import { Searchbar } from './Searchbar'
import { useNavigateToPokemon } from '../../hook/useNavigateToPokemon'
import { FilterProvider } from '../../hook/filterContext'

const MAX_POKEMON_ID = 1010

const Layout = styled.div`
  margin: 16px;
  display: grid;
  gap: 12px;

  & > .content {
    display: flex;
    gap: 16px;
    margin: auto;
    justify-content: center;
    flex-wrap: wrap;
  }
`
const getIdFromUrl = url => +url.split('pokemon/')[1].slice(0,-1)

export const App = () => {
  const [params] = useSearchParams()
  const [page, setPage] = useState(+params.get('page') || 1)
  const [searchTerm, setSearchterm] = useState()
  const [pageSize, setPageSize] = useState(30)
  const { data } = useSWR(`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${pageSize * (page - 1)}`)
  useNavigateToPokemon(searchTerm)

  return (
    <FilterProvider>
      <Layout>
        <Searchbar onClick={value => setSearchterm(value)}/>
        <div className="content">
          {data ? data?.results.map((pokemon, index) => (
            getIdFromUrl(pokemon.url) <= MAX_POKEMON_ID && 
          <Card name={pokemon.name} url={pokemon.url} key={index}/>
          )) : <Loader count={pageSize} />}
        </div>
        <Pagination 
          MAX_POKEMON_ID={MAX_POKEMON_ID}
          disabled={!data}
          page={page} 
          setPage={setPage} 
          pageSize={pageSize} 
          setPageSize={setPageSize}
        />
      </Layout>
    </FilterProvider>
  )
}
