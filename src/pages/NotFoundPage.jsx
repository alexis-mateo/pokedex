import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import Pikachu from '../assets/pikachu.png'

const Layout = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Lilita+One&display=swap');

  display: grid;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
  height: 100vh;
  background-color: #edd553;

  & span {
    color: #3B60DA;
    font-family: 'Lilita One', cursive;
  }

  & .title {
    font-size: 5em;
    position: absolute;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: .5rem;
  }

  & button {
    background-color: #3B60DA;
    color: #fff;
    border: none;
    border-radius: 2rem;
    padding: 10px 20px;
    margin-top: 20px;
    cursor: pointer;
    transition: all .15s ease-in-out;
    font-family: 'Lilita One', cursive;


    &:hover {
      background-color: #2a4a9f;
      transform: scale(1.1);
    }
  }
`

export const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <Layout>
      <img src={Pikachu} alt="Pikachu" />
      <span className="title">Page not found</span>
      <span>Sorry! The page you're looking for is not here.</span>
      <button onClick={() => navigate('/')}>Back home</button>
    </Layout>
  )
}