import { Navigate } from "react-router-dom";

const defaultValidate = () => {
    const item = JSON.parse(localStorage.getItem("user"));
    return item != null;
}

export default function ProtectedRoute({ children, validate = defaultValidate, redirectTo = "/login"}){

    if(validate()) {
        return <>{children}</>;
    } else {
        return <Navigate to={redirectTo} replace />
    }
}