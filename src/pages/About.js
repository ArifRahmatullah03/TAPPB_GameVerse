import React from 'react';
import './About.css';
import { FaDiscord } from 'react-icons/fa'; // menggunakan Font Awesome React icons

const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        GameVerse is the best platform for discovering and exploring games. 
        Our mission is to connect gamers with the best gaming experiences available online.
      </p>
      <h2>Join to Our Community</h2>
      <p>Join our community and discover exciting adventure. Don't miss out!</p>
      
      <div className="social-icons">
        <a href="https://discord.gg/CfzH8e5YUy" target="_blank" rel="noopener noreferrer" className="discord-icon">
          <FaDiscord />
        </a>
      </div>
    </div>
  );
};

export default About;
