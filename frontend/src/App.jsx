import { Routes, Route } from 'react-router-dom';
import Donate from './pages/Donate';
import ChildrenList from './pages/ChildrenList';
import RegisterSponsor from './pages/RegisterSponsor';
import SponsorDashboard from './pages/SponsorDashboard';
import SponsorLogin from './pages/SponsorLogin';
import SponsorDonations from './pages/SponsorDonations';

function App() {
  return (
    <Routes>
      <Route path="/children" element={<ChildrenList />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/sponsor/register" element={<RegisterSponsor />} />
      <Route path="/sponsor/:id/dashboard" element={<SponsorDashboard />} />
      <Route path="/sponsor/login" element={<SponsorLogin />} />
      <Route path="/sponsor/:id/donations" element={<SponsorDonations />} />

    </Routes>
  );
}
export default App;
