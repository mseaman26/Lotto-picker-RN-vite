import ProfilePage from "../pages/ProfilePage";
import ProtectedRoute from "../components/ProtectedRoute";

export default function ProfilePageVite() {
  return (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  )
}