import { Fragment } from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { getStatInfo } from '../../utils/getStatInfo'
import { getMultipliers } from '../../utils/getMultiplier'
import { TypeIconLabel } from '../../components/TypeIconLabel'

const multiplierColors = {
  0:   '#aaa',
  0.5: '#afa',
  1:   '#eec',
  2:   '#f92',
  4:   '#e66',
}

const Layout = styled.div`
  .title {
    font-weight: bold;
    margin-top: 12px;
  }

  .stats { 
    display: grid;
    margin: auto;
    width: max-content;
    gap: 6px;

    & .line {
      display: grid;
      grid-template-columns: 20ch 3ch auto;
      gap: 8px;
    }
  }

  & .section {
    margin-top: 14px;
    & .weakness {
      display: grid;
      grid-auto-flow: column;
      grid-template-rows: repeat(2, max-content);
      grid-auto-columns: max-content;
      justify-content: center;
      overflow-x: auto;
      max-width: 650px;
      height: 150px;
      margin: 14px auto;
      gap: 3px 12px;

      & .type {
        transform: rotate(-180deg);
        & img {
          transform: rotate(90deg);
        }
        writing-mode: vertical-rl;
        padding: 8px 4px;
        justify-self: center;
      }
      
      & .multiplier {
        text-align: center;
        font-weight: 700;
        padding: 3px;
        border-radius: .25em;
        color: #333;
      }
    }
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
  const multipliers = getMultipliers(data?.types?.map(type => type.type.name))

  return (
    <Layout>
      <span className="title">Stats</span>
      <div className="stats">
        {data?.stats?.map((stat, index) => <div className="line" key={index}>
          <span>{getStatInfo(stat.stat.name)?.fullName}</span>
          <span>{stat.base_stat}</span>
          <Progress max="252" value={stat.base_stat} color={getStatInfo(stat.stat.name, stat.base_stat)?.color}></Progress>
        </div>)}
      </div>
      <div className="section">
        <span className="title">Weakness & resistance</span>
        <div className="weakness">
          {Object.keys(multipliers.defense).map((type, index) => 
            <Fragment key={index}>
              <TypeIconLabel type={type} className="type"/>
              <span 
                className="multiplier" 
                style={{ backgroundColor: multiplierColors[multipliers.defense[type]] }}
              >
                {multipliers.defense[type]}
              </span>
            </Fragment>
          )}
        </div>
      </div>
    </Layout>
  )
}