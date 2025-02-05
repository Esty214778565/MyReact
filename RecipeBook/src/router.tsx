import { createBrowserRouter } from 'react-router'
import HomePage from './components/HomePage'
import About from './components/user/About'
import LoggedIn from './components/user/LoggedIn'
import RecipeDetails from './components/My-Recipes/RecipeDetails'
import Layout from './components/Layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Layout />
    </>,
    children: [
      {
        path: 'about', element: <About />, errorElement: <>Error Page</>
      },
      {
        path: 'loggedin/:name', element: <LoggedIn />, errorElement: <>Error Page</>
      },
      {
        path: '/', element: <HomePage />, errorElement: <>Error Page</>,
        children: [{ path: "/recipeDetails/:id", element: <RecipeDetails /> }]
      },
    ]
  }
])