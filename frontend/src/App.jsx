import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Donate from './pages/Donate';
import ChildrenList from './pages/ChildrenList';
import RegisterSponsor from './pages/RegisterSponsor';
import SponsorDashboard from './pages/SponsorDashboard';
import Signup from './pages/SponsorSignup.jsx';
import SponsorLogin from './pages/SponsorLogin';
import SponsorDonations from './pages/SponsorDonations';
import Home from './pages/Home';
import RoleSelection from "./pages/RoleSelectionPage";
import SponsorChildLanding from './pages/SponsorLanding';
import VerifyOtp from './pages/VerifyOtp.jsx';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/children" element={<ChildrenList />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/sponsor/register" element={<RegisterSponsor />} />
      <Route path="/sponsor/:id/dashboard" element={<SponsorDashboard />} />
      <Route path="/sponsor/login" element={<SponsorLogin />} />
      <Route path="/sponsor/:id/donations" element={<SponsorDonations />} />
      <Route path="/choose-role" element={<RoleSelection />} />
      <Route path="/sponsor-a-child" element={<SponsorChildLanding />} />
      <Route path="/sponsor/signup" element={<Signup />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}
export default App;
