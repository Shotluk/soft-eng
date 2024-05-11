import MyNavbar from './Components/Navbar';
import Home from './Pages/Home';
import SchedulingPage from './Pages/Scheduling';
import Login from './Pages/Login';
import Payment from './Pages/Payment';
import Reviews from './Pages/Reviews';
import Admin from './Pages/Admin';
import BookingPage from './Pages/Booking';
import MachinePage from './Pages/Machine';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Pages/Register';



function App() {
  return (
    <Router>
      <div>
        <MyNavbar/>
        <Routes>
          <Route path="*" element={<Home></Home>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/scheduling" element={<SchedulingPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/machine" element={<MachinePage />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
