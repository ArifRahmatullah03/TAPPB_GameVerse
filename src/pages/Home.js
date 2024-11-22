import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to GameVerse</h1>
      <p>Your ultimate destination for discovering games!</p>
      <a href="/games" className="cta-button">Explore Games</a>
    </div>
  );
};

export default Home;
