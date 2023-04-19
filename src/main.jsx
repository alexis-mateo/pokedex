import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { App } from './App';
import { SWRConfig } from 'swr';
import { fetcher } from './utils/fetcher';

const router = createBrowserRouter([
  {
    path: "/",
    element:<App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SWRConfig value={{ fetcher: fetcher }}>
      <RouterProvider router={router} />
    </SWRConfig>
  </React.StrictMode>,
)
