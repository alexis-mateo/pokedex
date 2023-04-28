import { Tooltip } from '@mui/material'
import styled from 'styled-components'
import useSWR from 'swr'
import { usePokemonTypes } from '../../../utils/usePokemonTypes'

const Layout = styled.div`
  display: flex;
  cursor: default;

  & .chips {
    background-color: ${({ color }) => color};
    color: white;
    padding: 0.3rem 0.5rem;
    border-radius: 18px
  }
`

export const Ability = ({ url, pokemon }) => {
  const { data } = useSWR(url)
  const description = data?.effect_entries?.find(effect => effect?.language.name === 'en')?.effect
  const color = usePokemonTypes(pokemon)

  return (
    <Layout color={color}>
      <Tooltip title={description} arrow>
        <div className="chips">{data?.names?.find(name => name?.language.name === 'en')?.name}</div>
      </Tooltip>
    </Layout>
  )
}