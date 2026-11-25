
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router"

import AppLayout from "@/components/layout/AppLayout"
import DashboardPage from "@/features/dashboard/pages/DashboardPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />

          <Route path="dashboard" element={<DashboardPage />} />
        </Route>

        <Route
          path="*"
          element={
            <div className="p-8">
              Page not found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
