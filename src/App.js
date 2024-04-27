import MyNavbar from './Components/Navbar';
import SchedulingPage from './Pages/Scheduling';
import Login from './Pages/Login';
import Payment from './Pages/Payment';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div>
        <MyNavbar/>
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/scheduling" element={<SchedulingPage />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
