import {Navigate,Outlet} from 'react-router-dom'
interface Props {
 isALlowed: boolean
    children?: React.ReactNode;
}

export const ProtectedRoute = ({ isALlowed, children }: Props) => {
  if(!isALlowed) return <Navigate to="/login"/>
    return children? <>{children}</>:<Outlet/>;
};
