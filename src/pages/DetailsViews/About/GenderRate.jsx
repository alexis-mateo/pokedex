import { Genderless } from '@styled-icons/remix-line/Genderless'
import { GenderFemale } from '@styled-icons/bootstrap/GenderFemale'
import { GenderMale } from '@styled-icons/bootstrap/GenderMale'
import styled from 'styled-components'

const Layout = styled.div`
  & .gender{
    display: flex;
    gap: 8px;
    align-items: center;
  }

  & .genderItem {
    display: flex;
    gap: 4px;
    align-items: center;
  }
`

export const GenderRate = ({ femaleRate }) => (
  <Layout>
    {
      femaleRate === -1 ? <span className="genderItem"><Genderless size={16} />Genderless</span> : 
      <div className="gender">
        <div className="genderItem">
          <GenderMale size={16} style={{ color: '#CED1EE' }}/>
          <span>{((8 - femaleRate)/8) * 100}%</span>
        </div>
        <div>
          <GenderFemale size={16} style={{ color: '#F5BAD0' }} />
          <span>{(femaleRate/8) * 100}%</span>
        </div>
      </div>
    }
  </Layout>
)