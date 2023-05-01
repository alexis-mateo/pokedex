import styled from 'styled-components'
import { Link } from 'react-router-dom'
import useSWR from 'swr'

import pokeballImg from '../assets/pokeball.png'

const Layout = styled.div`
  display: grid;
  justify-items: center;
  position: relative;

  &:hover .pokeball {
    transform: translate(50%, -65%) rotate(45deg);
  }

  &:hover .image {
    transform: scale(1.05);
  }

  & .image {
    height: 120px;
    transition: 0.15s linear all;
    z-index: 1;
  }

  & .name {
    text-align: center;
    text-transform: capitalize;
    text-decoration: none;
    color: black;
  }

  & .pokeball {
    position: absolute;
    height: 100px;
    filter: brightness(90%);
    opacity: 0.7;
    top: 50%;
    right: 50%;
    transform: translate(50%, -65%);
    transition: 0.15s linear all;
  }
`

export const PokemonImage = ({ id }) => {
  const { data: pokemon } = useSWR(`https://pokeapi.co/api/v2/pokemon/${id}`)

  return (
    <Link to={`/details/${pokemon?.id}`} style={{ textDecoration: 'none' }}>
      <Layout>
        <img src={pokemon?.sprites.other['official-artwork'].front_default} className="image" />
        <span className="name">{pokemon?.name?.replaceAll('-', ' ')}</span>
        <img src={pokeballImg} className="pokeball" />
      </Layout>
    </Link>
  )
}