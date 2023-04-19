import { pokemonTypes } from './pokemonTypes'

export const usePokemonTypes = data => (
  pokemonTypes.filter(type => type?.name === data?.types[0]?.type?.name)[0]?.color ?? 'grey'
)