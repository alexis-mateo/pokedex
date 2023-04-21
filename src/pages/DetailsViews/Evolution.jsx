import { useParams } from "react-router"

import { useEvoltion } from "../../hook/useEvolution"
import { useEvolutionChain } from "../../hook/useEvolutionChain"
import { Link } from "react-router-dom"

export const Evolution = () => {
  const { id } = useParams()
  // const evoltuions = useEvoltion(id)
  const chains = useEvolutionChain(id)
  return (
    <div>
      {/* {chains?.map((chain, index) => <div key={index}>{index}- {chain.map(pokemon => pokemon.name + ' -> ')}</div>)} */}
      {
        chains?.filter(chain => 
          chain.map(pokemon => pokemon.id).includes(+id)
        )?.map((chain, index) => 
          <div key={index}>
            {index}- {chain.map(pokemon => <>
              <Link to={`/details/${pokemon.id}`}>{pokemon.name}</Link>
              <span> - </span>
            </>)}
          </div>
        )
      }
    </div>
  )
}