import useSWR from 'swr'

export const useEvoltion = id => {
  const { data: pokemonSepecies } = useSWR(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
  const { data: evolutionChain } = useSWR(pokemonSepecies ? pokemonSepecies?.evolution_chain.url : null)

  if(evolutionChain) return evolve(evolutionChain.chain)
}

const evolve = (evolution, parentId, result = []) => {
  const id = +evolution.species.url.split('pokemon-species/')[1].slice(0,-1)
  result.push({ 
    name: evolution.species.name,
    url: evolution.species.url,
    id: id,
    parentId,
  });
  if (evolution.evolves_to.length > 0) {
    for (let i = 0; i < evolution.evolves_to.length; i++) {
      evolve(evolution.evolves_to[i], id, result);
    }
  }
  return result;
}
