import styled from 'styled-components'
import { Skeleton } from '@mui/material'

const Layout = styled.div`
  height: 130px;
  width: calc(var(--card-width) - 10px);
  background-color: #c6c8cb;
  border-radius: 16px;
  padding: 15px;
  display: grid;
  grid-template-rows: repeat(4, max-content);
  gap: 8px;
`

export const CardSkeleton = () => (
  <Layout>
    <Skeleton width="10%" style={{ 'justifySelf': 'right' }}/>
    <Skeleton width="65%" />
    <Skeleton width="40%" />
    <Skeleton width="40%" />
  </Layout>
)