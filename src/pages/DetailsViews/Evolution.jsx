import { useParams } from "react-router"
import styled from "styled-components"
import { ArrowRight } from '@styled-icons/bootstrap/ArrowRight'

import { useEvolutionChain } from "../../hook/useEvolutionChain"
import { ChainImage } from "../../components/ChainImage"

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
  return (
    <Layout>
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
    </Layout>
  )
}