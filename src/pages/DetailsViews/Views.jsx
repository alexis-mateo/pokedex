import { About } from "./About"
import { Evolution } from "./Evolution"
import { Stats } from "./Stats"

const views = {
  about: <About />,
  evolution : <Evolution />,
  stats: <Stats />
}

export const Views = ({ view }) => (
  <>{views[view]}</>
)
