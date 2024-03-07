import MyNavbar from './Components/Navbar';
import Pricing from './Pages/Pricing';
import SchedulingPage from './Pages/Scheduling';


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <MyNavbar/>
        <Routes>
          {/*<Route path="/" element={<Home />} />}
          {/*<Route path="/features" element={<Services />} />*/}
          
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/features" element={<SchedulingPage />} />
          
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
