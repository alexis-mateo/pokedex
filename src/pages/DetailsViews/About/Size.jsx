import styled from "styled-components"

const Layout = styled.div`
  display: flex;
  box-shadow: 0px 0px 22px 7px rgba(0,0,0,0.1);
  justify-content: space-around;
  width: 80%;
  border-radius: 8px;
  padding-block: .6rem;
  margin: auto;
  margin-block: 10px;

  & .sizeItem {
    display: grid;
    & .title {
      font-weight: bold;
    }
  }
`

export const Size = ({ height, weight }) => (
  <Layout>
    <div className="sizeItem">
      <span className="title">Height</span>
      <span>{height ? height/10 : 0} m</span>
    </div>
    <div className="sizeItem">
      <span className="title">Weight</span>
      <span>{weight ? weight/10 : 0} kg</span>
    </div>
  </Layout>
)