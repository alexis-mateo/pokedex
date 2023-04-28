import { useParams } from "react-router-dom"
import useSWR from 'swr'
import styled from 'styled-components'

import { Size } from "./Size"
import { GenderRate } from "./GenderRate"
import { Ability } from "./Ability"

const clearFlavorText = (text = '') => (
  text.replaceAll('\f', '\n')
      .replaceAll('\u00ad\n', '')
      .replaceAll('\u00ad', '')
      .replaceAll(' -\n', ' - ')
      .replaceAll('-\n', '-')
      .replaceAll('\n', ' ')
)

const Layout = styled.div`
  display: grid;
  gap: 1.4rem;
  margin-top: 24px;

  & section {
    display: grid;
    gap: 12px;
  }

  & .sectionTitle {
    font-weight: bold;
  }

  & .infos {
    display: grid;
    & .line {
      display: grid;
      grid-template-columns: 20ch  1fr;
    }
  }

  & .abilities {
    display: flex;
    gap: 8px;
  }
`

export const About = () => {
  const { id } = useParams()
  const { data: pokemonData } = useSWR(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const { data: pokemonSpecies } = useSWR(`https://pokeapi.co/api/v2/pokemon-species/${id}`)

  const alias = pokemonSpecies?.genera?.find(value => value.language.name === 'en')?.genus 
  const description = clearFlavorText(
    pokemonSpecies?.flavor_text_entries?.filter(text => text.language.name === 'en')[0]?.flavor_text
  ) 
  const femaleRate = pokemonSpecies?.gender_rate

  return (
    <Layout>
      <section>
        {alias && <span className="sectionTitle">{alias}</span>}
        {description && <span>{description}</span>}
        <Size height={pokemonData?.height} weight={pokemonData?.weight} />
      </section>
      {pokemonSpecies && <section>
        <span className="sectionTitle">More détails</span>
        <div className="infos">
          <div className="line">
            <span>Generation</span><span>{pokemonSpecies?.generation.name?.split('-')[1].toUpperCase()}</span>
          </div>
          <div className="line">
            <span>Shape</span><span>{pokemonSpecies?.shape?.name ?? '-'}</span>
          </div>
          <div className="line">
            <span>Capture rate</span>
            <span>{Math.round((pokemonSpecies?.capture_rate/255) * 100)}% ({pokemonSpecies?.capture_rate})</span>
          </div>
          <div className="line">
            <span>Gender rate</span>
            <GenderRate femaleRate={femaleRate} />
          </div>
        </div>
      </section>}
      <section>
        <span className="sectionTitle">Abilities</span>
        <div className="abilities">
          {pokemonData?.abilities?.map((ability, index) => <Ability url={ability.ability.url} pokemon={pokemonData} key={index} />)}
        </div>
      </section>
    </Layout>
  )
}