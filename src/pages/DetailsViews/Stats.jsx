import useSWR from 'swr'
import styled from 'styled-components'
import { useParams } from "react-router-dom"

const Layout = styled.div`
  display: grid;
  padding-block: 16px;

  & .line {
    display: grid;
    grid-template-columns: 20ch 3ch auto;
    gap: 8px;
  }
`

export const Stats = () => {
  const { id } = useParams()
  const { data } = useSWR(`https://pokeapi.co/api/v2/pokemon/${id}`)
  return (
    <Layout>
      {data?.stats?.map(stat => <div className="line">
        <span>{stat.stat.name}</span>
        <span>{stat.base_stat}</span>
        <progress max="252" value={stat.base_stat}></progress>
      </div>)}
    </Layout>
  )
}