import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AssignmentDetail from './pages/AssignmentDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/assignment/:id" element={<AssignmentDetail />} />
    </Routes>
  );
}

export default App;
