import useSWR from 'swr'

const getIdFromSpeciesUrl = url => +url.split('pokemon-species/')[1].slice(0,-1)

export const useEvolutionChain = pokemonId => {
  const { data: speciesData } = useSWR(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
  const evolutionChainUrl = speciesData?.evolution_chain.url

  const { data: evolutionChainData } = useSWR(evolutionChainUrl)
  const { chain } = evolutionChainData || {}

  const getEvolutionBranches = chain => {
    const branches = []
    const currentBranch = []

    const traverseChain = evolution => {
      const id = getIdFromSpeciesUrl(evolution.species.url)
      const pokemonSpriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      currentBranch.push({
        id,
        name:             evolution.species.name,
        pokemonSpriteUrl: pokemonSpriteUrl,
      })

      if (evolution.evolves_to.length === 0) {
        branches.push(currentBranch.slice())
      } else {
        evolution.evolves_to.forEach(nextEvolution => {
          traverseChain(nextEvolution)
          currentBranch.pop()
        })
      }
    }
    traverseChain(chain)

    return branches
  }

  return chain ? getEvolutionBranches(chain) : []
}

