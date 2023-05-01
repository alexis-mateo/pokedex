import styled from 'styled-components'

const Layout = styled.div`
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 16px;
  text-align: center;
  padding: 2px 10px;
  text-transform: capitalize;
  font-size: 14px;
`

export const Type = ({ children }) => (
  <Layout>{children}</Layout>
)