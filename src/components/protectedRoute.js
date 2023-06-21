import { Navigate } from "react-router-dom";

/**
 * checks if the user is connected
 * @returns {boolean} true if the user is connected
 */
const defaultValidate = () => {
    const item = JSON.parse(localStorage.getItem("user"));
    return item != null;
}

/**
 * a component that will redirect the user to {redirectTo} if he is not connected
 * @component
 * @property {React.ReactElement} children
 * @property {function} validate
 * @property {string} redirectTo
 * @returns {React.ReactElement}
 */
export default function ProtectedRoute({ children, validate = defaultValidate, redirectTo = "/login"}){

    if(validate()) {
        return <>{children}</>;
    } else {
        return <Navigate to={redirectTo} replace />
    }
}