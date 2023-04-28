const getStatColor = value => {
  if (value < 50) return '#DB2828'
  if (value < 80) return '#EF6E33'
  if (value < 100) return '#FBBD08'
  if (value < 130) return '#B5CC18'
  if (value < 150) return '#21BA45'
  if (value < 180) return '#00B5AD'
  if (value >= 180) return '#4571E6'
}

const fullName = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Special Attack',
  'special-defense': 'Special Defense',
  speed: 'Speed'
}

export const getStatInfo = (name, value) => ({
  color: getStatColor(value),
  fullName: fullName[name],
})