import React, { useState } from 'react';

function GameCard({ game, highlightedGameId }) {
  const [showDetails, setShowDetails] = useState(false);

  const getRatingClass = (rating) => {
    if (rating >= 8) return 'rating-green'; // verde > 8 
    if (rating >= 6) return 'rating-yellow'; // giallo 6-8 
    return 'rating-red'; // rosso < 6 
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completato': return 'badge-completato'; // verde 
      case 'in-corso': return 'badge-in-corso'; // giallo 
      case 'wishlist': return 'badge-wishlist'; // blu 
      case 'abbandonato': return 'badge-abbandonato'; // grigio 
      default: return '';
    }
  };

  return (
    <div
      className={`game-card ${game.id === highlightedGameId ? 'highlighted' : ''}`}
      onClick={() => setShowDetails(!showDetails)} // Click per mostrare/nascondere 
    >
      <div className="game-card-image-container">
        <img src={game.coverUrl} alt={game.title} /> {/* Cover image  */}
      </div>
      <div className="game-card-content">
        <h3>{game.title}</h3> {/* Titolo  */}
        <p>Genere: <strong>{game.genre}</strong></p> {/* Genere  */}
        <p className={`game-card-rating ${getRatingClass(game.rating)}`}>
          Voto: {game.rating.toFixed(1)} {/* Voto numerico colorato  */}
        </p>
        <span className={`game-card-badge ${getStatusBadgeClass(game.status)}`}>
          {game.status} {/* Badge colorato per stato  */}
        </span>

        {showDetails && (
          <div className="game-card-details">
            <p>Piattaforma: <strong>{game.platform}</strong></p> {/*  */}
            <p>Anno di uscita: <strong>{game.year}</strong></p> {/*  */}
            <p>Prezzo: <strong>{game.price === 0 ? 'Gratis' : `${game.price.toFixed(2)}€`}</strong></p> {/*  */}
            <p>Ore giocate: <strong>{game.hoursPlayed}</strong></p> {/*  */}
            <p>Difficoltà: <strong>{game.difficulty}</strong></p> {/*  */}
          </div>
        )}
      </div>
    </div>
  );
}

export default GameCard;