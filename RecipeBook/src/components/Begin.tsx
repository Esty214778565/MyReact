import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './My-Recipes/RecipeStore'
import { router } from '../router'
import { useContext } from 'react'
import { UserContext } from './HomePage'

const Begin = () => {
  const current = useContext(UserContext)
  return (
    <>
      <UserContext value={current}>
        <Provider store={store}>
          <div style={{ height: '100vh', position: 'relative' }}>
            <RouterProvider router={router} />
          </div>
        </Provider>
      </UserContext>
    </>
  )
}
export default Begin
