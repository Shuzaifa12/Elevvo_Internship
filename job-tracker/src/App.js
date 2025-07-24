import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import JobDetails from './pages/JobDetails';
import Header from './components/Header';
import EditJob from './pages/EditJob';

function App() {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddJob />} />
          <Route path="/job/:id" element={<JobDetails />} />
          {/* <Route path="/job/:id" element={<JobDetails />} /> */}
          <Route path="/edit/:id" element={<EditJob />} />
        </Routes>
    </Router>
  );
}

export default App;
