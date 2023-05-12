import { useLocation, Navigate } from "react-router-dom";
import { checkNotConnected } from "../util/authValidators";




export default function PublicRoute({ children }) {
    const location = useLocation();

    if(checkNotConnected()) {
        return <>{children}</>;
    } else {
        return <Navigate to={location.pathname} replace />
    }
}
