import LottoGamePage from "../../pages/LottoGamePage";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function LottoGamePageRoute() {
  return (
    <ProtectedRoute>
      <LottoGamePage />
    </ProtectedRoute>
  )
}