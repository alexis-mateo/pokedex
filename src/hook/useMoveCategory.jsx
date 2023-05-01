import physical from '../assets/moveCategories/physical.png'
import special from '../assets/moveCategories/special.png'
import status from '../assets/moveCategories/status.png'

const categories = {
  physical, special, status,
}

export const useMoveCategory = category => categories[category]