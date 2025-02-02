import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './components/My-Recipes/RecipeStore'
import { router } from './router'
import { useContext } from 'react'
import { UserContext } from './components/HomePage'

const Begin = () => {
  const current = useContext(UserContext)
  return (
    <>
      <UserContext.Provider value={current}>
        <Provider store={store}>
          <div style={{ height: '100vh', position: 'relative' }}>
            <RouterProvider router={router} />
          </div>
        </Provider>
      </UserContext.Provider>
    </>
  )
}
export default Begin
