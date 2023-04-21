import { useParams } from "react-router"

import { useEvoltion } from "../../hook/useEvolution"

export const Evolution = () => {
  const { id } = useParams()
  const evoltuions = useEvoltion(id)
  return (
    <div>
      {evoltuions?.map(evolution => <span>{evolution.name} - </span>)}
    </div>
  )
}