import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PatientDetail from "./pages/PatientDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/patient/:id" element={<PatientDetail />} />
    </Routes>
  );
}

export default App;