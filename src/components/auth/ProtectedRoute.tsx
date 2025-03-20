import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/UseAuth"; // Donde obtienes el usuario

const ProtectedRoute = ({ children, allowedRoles  }) => {
    console.log('entre');
    const { data } = useAuth();
    const location = useLocation();

    if (!data) {
        // Si el usuario no está autenticado, lo redirige al login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(data.roles[0].name)) {
        // Si el usuario no tiene el rol adecuado, lo redirige a una página de error
        return <Navigate to="/app" replace />;
    }

    return children; // Renderiza el componente permitido
};

export default ProtectedRoute;
