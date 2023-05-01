import { useState } from 'react'
import useSWR from 'swr'
import styled, { keyframes } from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { Tab, Tabs } from '@mui/material'
import { Sparkles as Normal } from '@styled-icons/ionicons-outline/Sparkles'
import { Sparkles as Shiny} from '@styled-icons/ionicons-sharp/Sparkles'
import { ArrowLeftLong as ArrowLeft } from '@styled-icons/fa-solid/ArrowLeftLong'

import { usePokemonTypes } from '../utils/usePokemonTypes'
import { Type } from '../components/Type'
import { Views } from './DetailsViews'
import pokeballImg from '../assets/pokeball.png'

const rotate = keyframes`
  from {
    transform: translate(50%, -20%) rotate(0deg) ;
  }
  to {
    transform: translate(50%, -20%) rotate(360deg) ;
  }
`

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

    & .back {
      position: absolute;
      top: -25px;
      color: white;
      cursor: pointer;
    }

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
      z-index: 2;
    }
    & .pokeball {
      position: absolute;
      height: 160px;
      filter: brightness(90%);
      opacity: 0.5;
      top: 50%;
      right: 50%;
      animation: ${rotate} 3s linear infinite;
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

    & .navPokemon {
      position: absolute;
      height: 150px;
      filter: brightness(0);
      opacity: 0.6;
      top: 25%;
      cursor: pointer;
    }

    & .prevPokemon {
      left: 10%;
    }

    & .nextPokemon {
      right: 10%;
    }
  }

  & .card {
    background-color: white;
    border-radius: 16px;
    padding: 32px 32px;
    z-index: 1;
  }
`

export const Details = () => {
  const [view, setView] = useState('about')
  const [isShiny, setIsShiny] = useState(false)
  const { id } = useParams()
  const { data: informations } = useSWR(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const mainColor = usePokemonTypes(informations)
  const navigate = useNavigate()
  const pokemonSpriteUrl = id => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  return (
    <Layout bgColor={mainColor}>
      <div className="content">
        <div className="header">
          <ArrowLeft className="back" size={20} onClick={() => navigate(-1)}/>
          <div className="title">
            <span>{informations?.name?.replaceAll('-', ' ')}</span>
            <span>#{id}</span>
          </div>
          <div className="types">
            {informations?.types?.map((type, index) => <Type key={index}>{type?.type?.name}</Type>)}
          </div>
          <img src={informations?.sprites.other['official-artwork'][isShiny ? 'front_shiny' : 'front_default']} className="image" />
          <img src={pokeballImg} className="pokeball" />
          {
            (id > 1 && id <= 1010)&& <img src={pokemonSpriteUrl(+id - 1)}
              className="prevPokemon navPokemon"
              onClick={() => navigate(`/details/${+id - 1}`)}
            />
          }
          {
            id < 1010 && <img src={pokemonSpriteUrl(+id + 1)} 
              className="nextPokemon navPokemon"
              onClick={() => navigate(`/details/${+id + 1}`)}
            />
          }
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
  )
}