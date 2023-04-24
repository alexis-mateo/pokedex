import useSWR from 'swr'

export const useMega = pokemonId => {
  const { data } = useSWR(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)

  const hasMegaForm = () => data?.varieties.filter(variety => variety?.pokemon.name.match(/.*-mega|.*-gmax|.*-primal/gm)).length > 0

  const isMega = () => {
    return data?.name.match(/.*-mega|.*-gmax|.*-primal/gm)
  }

  const getMegaForms = () => {
    if(!hasMegaForm()) return null
    return data?.varieties.filter(variety => variety?.pokemon.name.match(/.*-mega|.*-gmax|.*-primal/gm)).map(
      pokemon => +pokemon.pokemon.url.split('/')[6]
    )
    
  }

  return { hasMegaForm, isMega, getMegaForms }
}
