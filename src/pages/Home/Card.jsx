import styled from 'styled-components'
import useSWR from 'swr'
import { useNavigate } from 'react-router-dom'

import pokeballImg from '../../assets/pokeball.png'
import { CardSkeleton } from '../../components/CardSkeleton'
import { Type } from '../../components/Type'
import { usePokemonTypes } from '../../utils/usePokemonTypes'
import { useFilter } from '../../hook/filterContext'

const Layout = styled.div`
  display: grid;
  gap: 5px;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 16px;
  padding: 10px 0 5px 20px;
  color: white;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  width: var(--card-width);
  height: var(--card-height);

  & .id {
    justify-self: end;
    font-weight: bold;
    padding-right: 20px;
    color: #2c2c2c;
    opacity: 0.3;
    transition: ease-in 0.15s all;
  }

  & .name {
    text-transform: capitalize;
    font-size: 1.3rem;
    font-weight: 800;
  }

  & .image {
    height: 120px;
    width: 120px;
    z-index: 1;
    transition: 0.15s linear all;
  }

  & .pokeball {
    position: absolute;
    height: 133px;
    opacity: 0.5;
    bottom: -19px;
    right: -16px;
    transition: 0.15s linear all;
  }

  & .types {
    display: grid;
    justify-content: start;
    gap: 8px;
  }

  & .content {
    display: grid;
    grid-template-columns: 1fr auto;
  }

  & .detail {
    display: grid;
    gap: 12px;
    justify-content: start;
    align-items: baseline;
    grid-template-rows: repeat(2, max-content);
  }

  &:hover .pokeball {
    transform: rotate(45deg);
  }

  &:hover .image {
    transform: scale(1.1);
  }

  &:hover .id{
    color: white;
    opacity: 1;
  }

`

export const Card = ({ url, name }) => {
  const navigate = useNavigate()
  const { data } = useSWR(url)
  const mainColor = usePokemonTypes(data)
  const { type } = useFilter()
  const isVisible = type == null || 
                    data?.types?.map(({ type }) => type.name)?.some(el => el === type)

  return (<>
    {data != null ? <>
      {isVisible && 
        <Layout bgColor={mainColor} onClick={() => navigate(`/details/${data?.id}`)}>
          <span className="id">#{data?.id}</span>
          <div className="content">
            <div className="detail">
              <span className="name">{name?.replaceAll('-', ' ')}</span>
              <div className="types">
                {data?.types?.map((type, index) => <Type key={index}>{type?.type?.name}</Type>)}
              </div>
            </div>
            <img src={data?.sprites.other['official-artwork'].front_default} className="image" />
          </div>
          <img src={pokeballImg} className="pokeball" />
        </Layout>
      }</> : <CardSkeleton />
    }
  </>)
}