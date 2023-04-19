import styled from 'styled-components'
import useSWR from 'swr'
import pokeballImg from './assets/pokeball.png'

import { pokemonTypes } from './utils/pokemonTypes'

const Layout = styled.div`
  display: grid;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 16px;
  padding: 10px 20px;
  color: white;
  position: relative;

  & .id {
    justify-self: end;
    font-weight: bold;
  }

  & .name {
    text-transform: capitalize;
    font-size: 1.3rem;
    font-weight: 800;
  }

  & .image {
    height: 128px;
    width: 128px;
    z-index: 1;
  }

  & .pokeball {
    position: absolute;
    height: 128px;
    opacity: 0.5;
    bottom: 10px;
    right: 20px;
  }

  & .types {
    display: grid;
  }

  & .content {
    display: grid;
    grid-template-columns: 1fr auto;
  }

`

export const Card = ({ url, name }) => {
  const { data } = useSWR(url)
  const mainColor = pokemonTypes.filter(type => type?.name === data?.types[0]?.type?.name)[0]?.color
  return (
    <Layout bgColor={mainColor}>
      <span className="id">#{data?.id}</span>
      <div className="content">
        <div className="detail">
          <span className="name">{name}</span>
          <div className="types">
            <span>Feu</span>
            <span>Plante</span>
          </div>
        </div>
        <img src={data?.sprites.other['official-artwork'].front_default} className="image" />
      </div>
      <img src={pokeballImg} className="pokeball" />
    </Layout>
  )
}