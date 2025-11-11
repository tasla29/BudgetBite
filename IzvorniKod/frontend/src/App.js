import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Creator from "./pages/Creator";
import Dashboard from "./pages/DashBoard";
import MoodJournal from "./pages/MoodJournal";
import ReflectionPage from "./pages/ReflectionPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />
        <Route path="/creator" element={<Creator />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recipes" element={<div>Recepti</div>} />
        <Route path="/profile" element={<div>Moj profil</div>} />
        <Route path="/moodjournal" element={<MoodJournal />} />
        <Route path="/reflectionpage" element={<ReflectionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
