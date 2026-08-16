import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Events from "./components/Events";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/events" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;