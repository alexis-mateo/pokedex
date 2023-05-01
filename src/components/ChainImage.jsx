import styled from 'styled-components'
import { Link } from 'react-router-dom'

import pokeballImg from '../assets/pokeball.png'

const Layout = styled.div`
  display: grid;
  justify-content: center;
  position: relative;

  &:hover .pokeball {
    transform: translate(50%, -65%) rotate(45deg);
  }

  &:hover .image {
    transform: scale(1.05);
  }

  & .image {
    height: 75px;
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
    height: 65px;
    filter: brightness(90%);
    opacity: 0.7;
    top: 50%;
    right: 50%;
    transform: translate(50%, -65%);
    transition: 0.15s linear all;
  }
`

export const ChainImage = ({ chain }) => (
  <Link to={`/details/${chain.id}`} style={{ textDecoration: 'none' }}>
    <Layout>
      <img src={chain.pokemonSpriteUrl} className="image" />
      <span className="name">{chain.name}</span>
      <img src={pokeballImg} className="pokeball" />
    </Layout>
  </Link>
)