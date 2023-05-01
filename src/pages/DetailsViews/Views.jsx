import styled from 'styled-components'
import { About } from './About'
import { Evolution } from './Evolution'
import { Stats } from './Stats'
import { Moves } from './Moves'

const Layout = styled.div`
  /* min-height: 300px; */
  max-height: 400px;
  overflow: auto;
`

const views = {
  about:     <About />,
  evolution: <Evolution />,
  stats:     <Stats />,
  moves:     <Moves />,
}

export const Views = ({ view }) => (
  <Layout>{views[view]}</Layout>
)
