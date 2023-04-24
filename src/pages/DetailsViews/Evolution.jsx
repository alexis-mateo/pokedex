import { useParams } from "react-router"
import styled from "styled-components"
import { ArrowRight } from '@styled-icons/bootstrap/ArrowRight'

import { useEvolutionChain } from "../../hook/useEvolutionChain"
import { ChainImage } from "../../components/ChainImage"
import { useMega } from "../../hook/useMega"
import { PokemonImage } from "../../components/PokemonImage"
import PokeGif from '../../assets/pokeball-wait.gif'

const Layout = styled.div`
  display: grid;
  gap: 16px;
  margin-top: 10px;
  & .title {
    font-size: 1.2rem;
    font-weight: bold;
  }

  & .evolution {
    display: grid;
    gap: 32px;
    & .chain {
      display: grid;
      gap: 8px;
      & .chainLine {
        display: grid;
        grid-template-columns: max-content 60px max-content;
        justify-content: space-evenly;
        align-items: center;
        & .arrow {
          color: #d0cece;
        }
      }
    }
  }

  & .megas {
    display: flex;
    justify-content: space-evenly;
  }

  & .empty {
    display: grid;
    gap: 8px;
    justify-items: center;
    & .image {
      width: 40%;
    }
  }
`

const createImgChain = chain => {
  const images = []
  for (let i = 0; i < chain.length - 1; i++) {
    images.push(
      <div key={i} className="chainLine">
        <ChainImage chain={chain[i]} />
        <ArrowRight size="100%" className="arrow" />
        <ChainImage chain={chain[i+1]} />
      </div>
    )
  }
  return images
}

export const Evolution = () => {
  const { id } = useParams()
  const chains = useEvolutionChain(id)
  const { hasMegaForm, getMegaForms, isMega } = useMega(id)

  return (
    <Layout>
      {chains[0]?.length > 1 && <>
        <span className="title">Evolution chain :</span>
        <div className="evolution">
          {
            chains?.filter(chain => 
              chain.map(pokemon => pokemon.id).includes(+id)
            )?.map((chain, index) => 
              <div key={index} className="chain">
                {createImgChain(chain)}
              </div>
            )
          }
        </div>
      </>}
      {(hasMegaForm() && !isMega()) && <>
        <span className="title">Mega form :</span>
        <div className="megas">
          {getMegaForms().map((pokemon, index) => <PokemonImage key={index} id={pokemon} />)}
        </div>
      </>}
      {((chains.length <= 1 || chains[0]?.length <= 1) && !hasMegaForm()) && 
        <div className="empty">
          <img src={PokeGif} className="image"/>
          <span className="title">There is nothing here...</span>
        </div>
      }
    </Layout>
  )
}