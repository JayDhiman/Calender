import React, { useEffect } from 'react'
import { useNavigate,Outlet } from 'react-router-dom'



const PrivateRoute = ({token}) => {
const navigate = useNavigate()
 
useEffect(() => {
  if (!token) {
    navigate('/login');
  }
}, [navigate]); 
return <Outlet/>


 
}

export default PrivateRoute