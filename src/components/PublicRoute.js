import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export default function PublicRoute({ element: Element, ...rest }) {
    const { currentUser } = useAuth();

    return !currentUser ? <Outlet /> : <Navigate to="/" />
}