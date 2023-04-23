import styled from "styled-components"
import { About } from "./About"
import { Evolution } from "./Evolution"
import { Stats } from "./Stats"

const Layout = styled.div`
  min-height: 300px;
  max-height: 400px;
  overflow: auto;
`

const views = {
  about: <About />,
  evolution : <Evolution />,
  stats: <Stats />
}

export const Views = ({ view }) => (
  <Layout>{views[view]}</Layout>
)
