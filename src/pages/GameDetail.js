import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './GameDetail.css';

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false); // New state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameDetail = async () => {
      try {
        const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
            'X-RapidAPI-Key': 'a977a05f28msh792f536e5e52401p11089fjsnd4f8baff26e4' // Replace with your API key
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setGame(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetail();
  }, [id]);

  const handleAddFavorite = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isGameAlreadyFavorite = savedFavorites.some(fav => fav.id === game.id);

    if (isGameAlreadyFavorite) {
      alert('This game is already in your favorites!');
    } else {
      savedFavorites.push(game);
      localStorage.setItem('favorites', JSON.stringify(savedFavorites));
      alert('Game added to favorites!');
      navigate('/favorites');
    }
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;
  if (!game) return <p>No game found!</p>;

  return (
    <div className="game-detail-container">
      <div className="game-detail-header">
        <h1>{game.title}</h1>
        <img className="game-detail-thumbnail" src={game.thumbnail} alt={game.title} />
      </div>
      <div className="game-detail-content">
        <p className="game-description">
          {isDescriptionExpanded ? game.description : `${game.description.slice(0, 150)}...`}
        </p>
        {game.description.length > 150 && (
          <button onClick={toggleDescription} className="toggle-description-button">
            {isDescriptionExpanded ? "Read Less" : "Read More"}
          </button>
        )}
        <div className="game-info">
          <h2>Game Details</h2>
          <ul>
            <li><strong>Genre:</strong> {game.genre}</li>
            <li><strong>Platform:</strong> {game.platform}</li>
            <li><strong>Publisher:</strong> {game.publisher}</li>
            <li><strong>Release Date:</strong> {game.release_date}</li>
          </ul>
        </div>
        <div className="add-button-container">
          <button onClick={handleAddFavorite} className="add-button">Add Favorite!</button>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
