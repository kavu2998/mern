import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import Contact from './components/Contact'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './privateRoute'

function App() {
  return (
    <Router >
      <Navbar />
      <Routes>
        <Route exact path="/" element={<PrivateRoute>
              <Home />
            </PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute>
              <Contact />
            </PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute>
              <Contact />
            </PrivateRoute>} />
        <Route path = '/login' element={<Login/>} />
        <Route path = '/register' element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;
