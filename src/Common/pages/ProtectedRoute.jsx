import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
    const location = useLocation();
    const path = location.pathname;
    const user = localStorage.getItem("role");
    if (user == null) {
        setTimeout(() => {
            alert("Please login again");

        }, 10)

        return <Navigate to="/signin" />

    }

    if (user === "user" && path === "/dashboard") {
        alert("Unauthorized access!!")
        return <Navigate to="/signin" />
    }
    if (user === "admin" && path === "/usrdash") {
        alert("Unauthorized access!!")
        return <Navigate to="/signin" />
    }
    
    return children

};

export default ProtectedRoute;