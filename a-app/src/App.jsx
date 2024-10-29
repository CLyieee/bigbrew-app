import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './app/pages/menu';
import './App.css';
import Dashboard from './app/pages/queue';

import { Toaster } from 'react-hot-toast';
// import Dashboard from './app/pages/dashboard';

function App() {
  return (
    <Router>
      <Toaster position='top-right' toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/queue" element={<Dashboard />} />
        {/* <Route path="/home" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;