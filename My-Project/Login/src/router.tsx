import { createBrowserRouter, Outlet } from 'react-router'
import NavBar from './components/NavBar'
import HomePage, { UserContext } from './components/HomePage'
import About from './components/About'
import LoggedIn from './components/LoggedIn'
import { createContext, useContext } from 'react'
import { User } from './UserModel'

// export const us=createContext<User>({});
// export const u=useContext(us)
// export const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <><Outlet /><us.Provider value={u}>  <NavBar/> </us.Provider></>,
//     children: [
//       {
//         path: 'about', element: <About />,errorElement:<>Error Page</> 
//       },
//       { path: 'loggedin', element: <LoggedIn />, errorElement: <>Error Page</>,
//         children:[{path:':name',element:<LoggedIn/>}]
//        },
      
//       { path: '/', element: <HomePage /> },
      
//     ]
//   }
// ])




export const router = createBrowserRouter([
  {
    path: '/',
    element: <> <Outlet />  <NavBar/> </>,
    children: [
      {
        path: 'about', element: <About />,errorElement:<>Error Page</> 
      },
      { path: 'loggedin', element: <LoggedIn />, errorElement: <>Error Page</>,
        children:[{path:':name',element:<LoggedIn/>}]
       },
      
      { path: '/', element: <HomePage /> },
      
    ]
  }
])