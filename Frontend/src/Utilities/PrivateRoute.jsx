import React from 'react'
import { useNavigate,Outlet } from 'react-router-dom'


const PrivateRoute = ({token}) => {
const navigate = useNavigate()
 
if(!token)
{
  return navigate('/login')
}

return <Outlet/>


 
}

export default PrivateRoute