import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Menu from "../src/components/Menu/Menu";
import About from "../src/components/About/About";
import Contact from "../src/components/Contact/Contact";
import Login from './components/Login/Login';
import Signup from './components/signup/Signup';
import ForgotPassword from "./components/Forgot-Password/ForgotPassword";
import EmailVerify from './components/EmailVerify/EmailVerify';
import PasswordReset from './components/PasswordReset/PasswordReset';
import EditProfile from './components/edit-profile/EditProfile';
import { Toaster } from 'react-hot-toast';
import ErrorPage from './components/ErrorPage/ErrorPage';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Toaster reverseOrder={false} />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/menu' exact element={<Menu />} />
          <Route path='/about' exact element={<About />} />
          <Route path='/contact' exact element={<Contact />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/signup' exact element={<Signup />} />
          <Route path='/forgot-password' exact element={<ForgotPassword />} />
          <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
          <Route path='/password-reset/:id/:token' element={<PasswordReset />} />
          <Route path='/edit-profile' element={<EditProfile />} />
          <Route path='*' element={<ErrorPage/>} />
        </Routes>
      </Router>
    </>
  );
}
export default App;