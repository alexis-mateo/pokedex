import { useState } from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { useParams } from "react-router-dom"
import { Tab, Tabs } from '@mui/material'
import { Sparkles as Normal } from '@styled-icons/ionicons-outline/Sparkles'
import { Sparkles as Shiny} from '@styled-icons/ionicons-sharp/Sparkles'

import { usePokemonTypes } from './utils/usePokemonTypes'
import { Type } from './components/Type'
import { Views } from './pages/DetailsViews'

const Layout = styled.div`
  background-color: ${({ bgColor }) => bgColor};
  height: 100%;

  & .content {
    display: grid;
    width: 750px;
    margin: auto;
    padding: 50px 50px 25px 50px;
  }

  & .header {
    display: grid;
    gap: 8px;
    position: relative;
    height: 200px;
    grid-template-rows: repeat(2, max-content);

    & .shiny {
      position: absolute;
      top: 30px;
      right: 0;
      height: 30px;
      width: 30px;
      color: white;
      cursor: pointer;
    }
    & .image {
      position: absolute;
      height: 200px;
      bottom: -35px;
      right: 37%;
    }
    & .title {
      display: flex;
      text-transform: capitalize;
      justify-content: space-between;
      color: white;
      font-weight: bold;
      font-size: 20px;
    }
    & .types {
      display: flex;
      gap: 12px;
    }
  }

  & .card {
    background-color: white;
    border-radius: 16px;
    padding: 32px 32px;
  }
`

export const Details = () => {
  const [view, setView] = useState('about')
  const [isShiny, setIsShiny] = useState(false)
  const { id } = useParams()
  const { data: informations } = useSWR(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const mainColor = usePokemonTypes(informations)

  return (<>
    <Layout bgColor={mainColor}>
      <div className="content">
        <div className="header">
          <div className="title">
            <span>{informations?.name}</span>
            <span>#{id}</span>
          </div>
          <div className="types">
            {informations?.types?.map((type, index) => <Type key={index}>{type?.type?.name}</Type>)}
          </div>
          <img src={informations?.sprites.other['official-artwork'][isShiny ? 'front_shiny' : 'front_default']} className="image" />
          <span className="shiny" onClick={() => setIsShiny(!isShiny)}>
            {!isShiny ? <Normal title="Normal" /> : <Shiny title="Shiny" />}
          </span>
        </div>
        <div className="card">
          <Tabs 
            centered
            value={view}
            onChange={(_, value) => setView(value)}
            variant="fullWidth"
          >
            <Tab label="About" value="about" />
            <Tab label="Stats" value="stats" />
            <Tab label="Evolution" value="evolution" />
            <Tab label="Moves" value="moves" />
          </Tabs>
          <Views view={view} />
        </div>
      </div>
    </Layout>
  </>)
}