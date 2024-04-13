import { Navigate, Outlet } from 'react-router-dom'
import AppHeader from '../HeaderComponent'
const PrivateRoutes = () => {
  
  let auth = sessionStorage.getItem("user_jwt")

return (
    auth ? <><AppHeader /><Outlet/></> : <Navigate to='/login'/>
  )
}
export default PrivateRoutes