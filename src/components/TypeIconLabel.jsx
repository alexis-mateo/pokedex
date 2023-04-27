import styled from 'styled-components'
import { pokemonTypes } from '../utils/pokemonTypes'
import { useTypeLogo } from '../hook/useTypeLogo'

const Layout = styled.div`
  background-color: ${({ bgColor }) => bgColor};
  color: white;
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: .25rem .5rem;
  border-radius: 8px;
  text-transform: capitalize;
  cursor: default;

  &>img {
    height: 16px;
  }
`

export const TypeIconLabel = ({ type }) => {
  const color = pokemonTypes.filter(typeObject => typeObject?.name === type)[0]?.color ?? 'grey'
  const logoPath = useTypeLogo(type)
  return (
    <Layout bgColor={color}>
      <img 
        src={logoPath}
      />
      <span>{type}</span>
    </Layout>
  )
}