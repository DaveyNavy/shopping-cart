import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import "./styles/index.css"
import Root from './routes/root'
import Index, { loader as indexLoader, } from './routes/index'
import ErrorPage from './routes/error'
import Cart from './routes/cart'
import MoviePage, { loader as movieLoader } from './routes/movie'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    children: [
      {
        errorElement: <ErrorPage></ErrorPage>,
        children: [
          { 
            index: true, 
            element: <Index></Index>,
            loader: indexLoader,
          },
          {
            path: "cart",
            element: <Cart></Cart>,
          },
          {
            path: "movies/:movieId",
            element: <MoviePage></MoviePage>,
            loader: movieLoader,
          },
        ]
      }
    ]
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
