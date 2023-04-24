import axios from "axios";
import useSWR from "swr";
import { fetcher } from '../utils/fetcher'

function arrayFetcher([...urlArr]) {
  const f = (u) => fetch(u).then((r) => r.json());
  return Promise.all(urlArr.map(f));
}

export const useRowsMoves = (pokemonId) => {
  const { data } = useSWR(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
  const urls = data?.moves?.map(move => move?.move.url)

  const { data: moves } = useSWR(urls, arrayFetcher)
  // console.log(toto)

  return moves?.map(move => ({
    id: move?.name,
    name: move?.name,
    type: move?.type?.name,
    power: move?.power || '-',
    accuracy: move?.accuracy || '-',
    pp: move?.pp,
    category: move?.damage_class?.name,
  }))

  
  // const rows = data?.moves.map(async (move, index) => {
  //   const moveData = await getMoveData(move.move.url)
  //   return {
  //     id: moveData?.name,
  //     name: moveData?.name,
  //     type: moveData?.type?.name,
  //     power: moveData?.power || '-',
  //     accuracy: moveData?.accuracy || '-',
  //     pp: moveData?.pp,
  //     category: moveData?.damage_class?.name,
  //   }
  // })

  // return rows;
}
