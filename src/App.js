import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Games from './pages/Games';
import GameDetail from './pages/GameDetail';
import Favorites from './pages/Favorites';
import About from './pages/About';
import ScrollReset from './components/ScrollReset'; // Import ScrollReset
import './App.css';

const App = () => (
  <Router>
    <div>
      {/* ScrollReset untuk memastikan scroll direset setiap kali navigasi */}
      <ScrollReset />

      {/* Fixed Header */}
      <header className="app-header">
        GameVerse
      </header>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/game/:id" element={<GameDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/about" element={<About />} />
      </Routes>

      {/* Navbar */}
      <Navbar />
    </div>
  </Router>
);

export default App;
