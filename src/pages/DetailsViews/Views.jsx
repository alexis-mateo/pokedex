import { About } from "./About"

const views = {
  about: <About />
}

export const Views = ({ view }) => (
  <>{views[view]}</>
)
