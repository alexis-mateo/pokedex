import useSWR from 'swr'

const ucFirst = text => text?.charAt(0).toUpperCase() + text?.slice(1)

function arrayFetcher([...urlArr]) {
  const f = u => fetch(u).then(r => r.json())
  return Promise.all(urlArr.map(f))
}

export const useRowsMoves = pokemonId => {
  const { data } = useSWR(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
  const urls = data?.moves?.map(move => move?.move.url)

  const { data: moves } = useSWR(urls, arrayFetcher)

  return moves?.map(move => ({
    id:       move?.name,
    name:     ucFirst(move?.name.replaceAll('-', ' ')),
    type:     move?.type?.name,
    power:    move?.power || '-',
    accuracy: move?.accuracy || '-',
    pp:       move?.pp,
    category: move?.damage_class?.name,
  }))
}
