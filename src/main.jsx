import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
const App = lazy(() => import('./App.jsx'))
const EventPage = lazy(() => import('./EventPage.jsx'))
const ErrorPage = lazy(() => import('./ErrorPage.jsx'))

const router = createBrowserRouter([
  { path: '/', element: <Suspense fallback={null}><App /></Suspense> },
  { path: '/events/:slug', element: <Suspense fallback={null}><EventPage /></Suspense> },
  { path: '*', element: <Suspense fallback={null}><ErrorPage /></Suspense> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
