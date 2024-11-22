import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Favorites.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]); // Daftar ID dari localStorage
  const [gameDetails, setGameDetails] = useState([]); // Data detail game dari API
  const navigate = useNavigate(); // Hook untuk navigasi halaman

  useEffect(() => {
    // Ambil data favorites dari localStorage
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);

    // Fetch detail setiap game dari API
    const fetchGameDetails = async () => {
      const fetchedDetails = await Promise.all(
        savedFavorites.map(async (game) => {
          try {
            const response = await fetch(
              `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${game.id}`,
              {
                headers: {
                  "X-RapidAPI-Host":
                    "free-to-play-games-database.p.rapidapi.com",
                  "X-RapidAPI-Key":
                    "a977a05f28msh792f536e5e52401p11089fjsnd4f8baff26e4",
                },
              }
            );
            if (response.ok) {
              const data = await response.json();
              return data;
            }
          } catch (error) {
            console.error("Error fetching game details:", error);
          }
          return null;
        })
      );
      setGameDetails(fetchedDetails.filter((game) => game !== null));
    };

    if (savedFavorites.length > 0) {
      fetchGameDetails();
    }
  }, []);

  const handleDelete = (index) => {
    const updatedFavorites = favorites.filter((_, i) => i !== index);
    const updatedGameDetails = gameDetails.filter((_, i) => i !== index);

    setFavorites(updatedFavorites);
    setGameDetails(updatedGameDetails);

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleNavigate = (id) => {
    navigate(`/game/${id}`);
  };

  return (
    <div className="favorites-container">
      <h1>Your Favorite Games</h1>
      {gameDetails.length === 0 ? (
        <div className="empty-message">
          <p>No favorite games added yet! Start exploring and add some!</p>
        </div>
      ) : (
        <ul>
          {gameDetails.map((game, index) => (
            <li
              key={game.id}
              onClick={() => handleNavigate(game.id)}
              style={{ cursor: "pointer" }} // Menambahkan pointer agar kotak terlihat bisa diklik
            >
              {/* Gambar Game */}
              <img
                src={game.thumbnail}
                alt={`${game.title} thumbnail`}
                className="game-image"
              />

              {/* Detail Game */}
              <div className="game-details">
                {/* Judul Game */}
                <h2 className="favorite-game-title">{game.title}</h2>

                {/* Genre Game */}
                <span className="game-genre">{game.genre}</span>

                {/* Deskripsi Game */}
                <p className="game-desc">{game.short_description}</p>
              </div>

              {/* Tombol Hapus */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Mencegah klik tombol memicu navigasi
                  handleDelete(index);
                }}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
