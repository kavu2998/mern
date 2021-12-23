import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import Contact from './components/Contact'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router >
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add' element={<Contact />} />
        <Route path='/edit/:id' element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
