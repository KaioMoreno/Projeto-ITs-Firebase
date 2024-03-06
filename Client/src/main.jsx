import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Error404 from './components/Error404.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import AdminHome from './components/AdminHome.jsx'
import Triagem from './components/Triagem.jsx'
import Suprimentos from './components/Suprimentos.jsx'
import Manutencao from './components/Manutencao.jsx'
import Froteq from './components/Froteq.jsx'
import PreparacaodeCargas from './components/PreparacaodeCargas.jsx'
import ArmMacae from './components/ArmMacae.jsx'
import Apr from './components/APR.jsx'
import ChamadaEmergencia from './components/ChamadaEmergencia.jsx'
import Rotograma from './components/Rotograma.jsx'



const router = createBrowserRouter([

  {
    path: '/',
    element: <App/> ,
    errorElement: <Error404/>,
    children: [
      {
        path: '/',
        element:<Home/>,
      },
      {
        path: '/chamadaemergencia',
        element: <ChamadaEmergencia/>
      }, 
      {
        path:'/admin',
        element:<Login/>
      },
      {
        path:'/admin/home',
        element: <AdminHome/>
      },

      {
        path:'/Triagem',
        element:<Triagem/>,
      },
      {
        path:'/Suprimentos',
          element:<Suprimentos/>
      },
      {
        path:'/PreparacaodeCargas',
        element:<PreparacaodeCargas/>
      },
      {
        path:'/Manutencao',
        element:<Manutencao/>
      },
      {
        path:'/Froteq',
        element:<Froteq/>
      },
      {
        path:'/ArmMacae',
        element:<ArmMacae/>
      },
      {
        path:'/Apr',
        element:<Apr/>
      },
      {
        path:'/Rotograma',
        element:<Rotograma/>
      }
    ]
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>,
)
