import { useState } from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { useParams } from "react-router-dom"

import { usePokemonTypes } from './utils/usePokemonTypes'
import { Type } from './components/Type'
import { Tab, Tabs } from '@mui/material'
import { Views } from './pages/DetailsViews/Views'

const Layout = styled.div`
  background-color: ${({ bgColor }) => bgColor};
  padding: 50px 50px 0 50px;
  height: 100%;

  & .content {
    display: grid;
    /* gap: 11rem; */
    width: 750px;
    margin: auto;
  }

  & .header {
    display: grid;
    gap: 8px;
    position: relative;
    height: 200px;
    grid-template-rows: repeat(2, max-content);

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
    height: 800px;
    padding: 32px 20px;
  }
`

export const Details = () => {
  const [view, setView] = useState('about')
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
          <img src={informations?.sprites.other['official-artwork'].front_default} className="image" />
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