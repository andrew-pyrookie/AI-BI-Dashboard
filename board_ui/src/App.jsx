import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import QuantAnalyticsDashboard from "./components/home";
import SignIn from "./components/login";
import AnalyticsPage from "./components/analytics";
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuantAnalyticsDashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/analytics" element={<AnalyticsPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
