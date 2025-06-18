import React from 'react';
import GameCard from './GameCard';

function GameList({ games, highlightedGameId }) {
  return (
    <div className="game-grid">
      {games.map(game => (
        <GameCard key={game.id} game={game} highlightedGameId={highlightedGameId} /> // Renderizzato con map e key corrette 
      ))}
    </div>
  );
}

export default GameList;