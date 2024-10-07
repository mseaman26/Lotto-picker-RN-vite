import HomePage from "../pages/HomePage";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Home() {
    return (
        <ProtectedRoute>
            <HomePage />
        </ProtectedRoute>
    )
}