import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'

export const useNavigateToPokemon = term => {
  const call = useSWR(term && `https://pokeapi.co/api/v2/pokemon/${term}`)
  const navigate = useNavigate()
  if(!call.error && call.data) navigate(`details/${call.data.id}`)
}