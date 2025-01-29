import './App.css'
import { RouterProvider } from 'react-router'
import { router } from './router'
import { Provider } from 'react-redux'
import store from './components/My-Recipes/RecipeStore'


function App() {


  return (
    <Provider store={store}>
      <div style={{ height: '100vh', position: 'relative' }}>
        <RouterProvider router={router} ></RouterProvider>
      </div>
    </Provider>
  )
}

export default App
