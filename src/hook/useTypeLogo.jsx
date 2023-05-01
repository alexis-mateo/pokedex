import bug from '../assets/pokemonTypes/bug.svg'
import dark from '../assets/pokemonTypes/dark.svg'
import dragon from '../assets/pokemonTypes/dragon.svg'
import electric from '../assets/pokemonTypes/electric.svg'
import fairy from '../assets/pokemonTypes/fairy.svg'
import fighting from '../assets/pokemonTypes/fighting.svg'
import fire from '../assets/pokemonTypes/fire.svg'
import flying from '../assets/pokemonTypes/flying.svg'
import ghost from '../assets/pokemonTypes/ghost.svg'
import grass from '../assets/pokemonTypes/grass.svg'
import ground from '../assets/pokemonTypes/ground.svg'
import ice from '../assets/pokemonTypes/ice.svg'
import normal from '../assets/pokemonTypes/normal.svg'
import poison from '../assets/pokemonTypes/poison.svg'
import psychic from '../assets/pokemonTypes/psychic.svg'
import rock from '../assets/pokemonTypes/rock.svg'
import steel from '../assets/pokemonTypes/steel.svg'
import water from '../assets/pokemonTypes/water.svg'

const types = {
  bug, dark, dragon, electric, fairy, fighting, fire, flying, ghost, grass, ground, ice, normal, poison, psychic, rock, steel, water,
}

export const useTypeLogo = type => types[type]