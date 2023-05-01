import useSWR from 'swr'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { getStatInfo } from '../../utils/getStatInfo'
// import { getMultipliers } from '../../utils/getMultiplier'

const Layout = styled.div`
  display: grid;
  padding-block: 16px;
  margin: 32px auto 0 auto;
  width: max-content;
  gap: 6px;

  & .line {
    display: grid;
    grid-template-columns: 20ch 3ch auto;
    gap: 8px;
  }
`

const Progress = styled.progress` 
  appearance: none;
  
  ::-webkit-progress-bar {
    height: 12px;
    background-color: #F8F8F8;
    border-radius: 5px;
  }

  ::-webkit-progress-value {
    height: 12px;
    border-radius: 5px;
    background: ${({ color }) => color};
  } 
`

export const Stats = () => {
  const { id } = useParams()
  const { data } = useSWR(`https://pokeapi.co/api/v2/pokemon/${id}`)
  // const multipliers = getMultipliers(data?.types?.map(type => type.type.name))
  return (
    <Layout>
      {data?.stats?.map((stat, index) => <div className="line" key={index}>
        <span>{getStatInfo(stat.stat.name)?.fullName}</span>
        <span>{stat.base_stat}</span>
        <Progress max="252" value={stat.base_stat} color={getStatInfo(stat.stat.name, stat.base_stat)?.color}></Progress>
      </div>)}
    </Layout>
  )
}