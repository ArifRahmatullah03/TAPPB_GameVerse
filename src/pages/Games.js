import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Games.css';

const Games = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('title'); // Default sort option
  const [selectedGenre, setSelectedGenre] = useState('all'); // Default genre filter
  const [genres, setGenres] = useState([]); // List of unique genres

  // Helper function to normalize genre
  const normalizeGenre = (genre) => genre.trim().toLowerCase();

  // Helper function to format genre
  const formatGenre = (genre) => {
    const acronymGenres = ['mmo', 'mmorpg', 'mmoarpg'];
    if (acronymGenres.includes(genre.toLowerCase())) {
      return genre.toUpperCase(); // Capitalize all letters for acronyms
    }
    return genre.charAt(0).toUpperCase() + genre.slice(1); // Capitalize first letter for others
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', {
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

        // Sort games by the default sort option when fetched
        const sortedData = sortGames(data, sortOption);
        setGames(sortedData);
        setFilteredGames(sortedData);

        // Extract unique genres, normalize them
        const uniqueGenres = ['all', ...new Set(data.map(game => normalizeGenre(game.genre)))];
        setGenres(uniqueGenres);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [sortOption]);

  const sortGames = (gamesArray, option) => {
    return [...gamesArray].sort((a, b) => {
      if (option === 'title') {
        return a.title.localeCompare(b.title);
      } else if (option === 'release_date') {
        return new Date(b.release_date) - new Date(a.release_date);
      }
      return 0;
    });
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    filterGames(value, selectedGenre);
  };

  const handleSort = (event) => {
    const value = event.target.value;
    setSortOption(value);
    const sorted = sortGames(filteredGames, value);
    setFilteredGames(sorted);
  };

  const handleGenreChange = (event) => {
    const genre = normalizeGenre(event.target.value);
    setSelectedGenre(genre);
    filterGames(searchTerm, genre);
  };

  const filterGames = (searchValue, genre) => {
    let filtered = games;

    // Filter by search term
    if (searchValue) {
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(searchValue)
      );
    }

    // Filter by genre
    if (genre !== 'all') {
      filtered = filtered.filter(game => normalizeGenre(game.genre) === genre);
    }

    setFilteredGames(filtered);
  };

  if (loading) {
    return (
      <div className="games-container">
        <div className="loading-spinner"></div>
        <p>Loading games...</p>
      </div>
    );
  }

  if (error) {
    return <div className="games-container">Error: {error}</div>;
  }

  return (
    <div className="games-container">
      <h1>Explore Games</h1>

      <div className="search-sort-container">
        <input
          type="text"
          placeholder="Search games..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
        <select value={sortOption} onChange={handleSort} className="sort-dropdown">
          <option value="title">Sort by Title</option>
          <option value="release_date">Sort by Release Date</option>
        </select>
        <div className="genre-filter">
          <label htmlFor="genre">Filter by Genre:</label>
          <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {formatGenre(genre)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="game-list">
        {filteredGames.map(game => (
          <div className="game-card" key={game.id}>
            <Link to={`/game/${game.id}`}>
              <img src={game.thumbnail} alt={game.title} />
              <div className="game-info">
                <h3>{game.title}</h3>
                <p className="game-description">{game.short_description}</p>
                <span className="game-genre">{formatGenre(game.genre)}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
