import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import { App } from './pages/Home'
import { SWRConfig } from 'swr'
import { fetcher } from './utils/fetcher'
import './css/main.css'
import { Details } from './pages/Details'

const router = createBrowserRouter([
  {
    path:    '/',
    element: <App />,
  },
  {
    path:    '/details/:id',
    element: <Details />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SWRConfig value={{ fetcher: fetcher }}>
      <RouterProvider router={router} />
    </SWRConfig>
  </React.StrictMode>
)
