import { Routes, Route } from 'react-router-dom';
import Donate from './pages/Donate';
import ChildrenList from './pages/ChildrenList';

function App() {
  return (
    <Routes>
      <Route path="/children" element={<ChildrenList />} />
      <Route path="/donate" element={<Donate />} />
    </Routes>
  );
}
export default App;
