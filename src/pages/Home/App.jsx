import useSWR from 'swr'
import { Card } from './Card'
import styled from 'styled-components'

const Layout = styled.div`
  display: grid;
  grid-template-columns: max-content max-content;
  gap: 16px;
  margin: auto;
  justify-content: center;
`

export const App = () => {
  const { data } = useSWR('https://pokeapi.co/api/v2/pokemon?limit=30&offset=0')
  return (<>
    {!data && <span>Loading</span>}
    <Layout>
      {data?.results.map((pokemon, index) => (
        <Card name={pokemon.name} url={pokemon.url} key={index}/>
      ))}
    </Layout>
  </>)
}
