import React, { useMemo } from 'react';

function GameStats({ games, totalGames }) { // Riceve tutti i giochi per le statistiche globali
  // Calcola ore totali giocate (somma di completati/in-corso) 
  const totalHoursPlayed = useMemo(() => {
    return games
      .filter(game => game.status === 'completato' || game.status === 'in-corso')
      .reduce((sum, game) => sum + (game.hoursPlayed || 0), 0);
  }, [games]);

  // Calcola numero giochi per stato 
  const gamesByStatus = useMemo(() => {
    return games.reduce((acc, game) => {
      acc[game.status] = (acc[game.status] || 0) + 1;
      return acc;
    }, {});
  }, [games]);

  // Voto medio della collezione 
  const averageRating = useMemo(() => {
    const ratedGames = games.filter(game => game.rating > 0);
    if (ratedGames.length === 0) return 0;
    const sumRatings = ratedGames.reduce((sum, game) => sum + game.rating, 0);
    return (sumRatings / ratedGames.length).toFixed(1);
  }, [games]);

  // Piattaforma con più giochi 
  const platformCounts = useMemo(() => {
    const counts = games.reduce((acc, game) => {
      acc[game.platform] = (acc[game.platform] || 0) + 1;
      return acc;
    }, {});

    let maxCount = 0;
    let mostCommonPlatform = 'N/A';
    for (const platform in counts) {
      if (counts[platform] > maxCount) {
        maxCount = counts[platform];
        mostCommonPlatform = platform;
      }
    }
    return mostCommonPlatform;
  }, [games]);

  // BONUS: Wishlist Budget 
  const wishlistTotalCost = useMemo(() => {
    return games
      .filter(game => game.status === 'wishlist' && game.price > 0)
      .reduce((sum, game) => sum + game.price, 0)
      .toFixed(2);
  }, [games]);


  return (
    <div className="stats-box">
      <h4>Statistiche della Collezione</h4>
      <ul>
        <li>Ore totali giocate: <strong>{totalHoursPlayed}h</strong></li> {/*  */}
        <li>Voto medio: <strong>{averageRating}</strong></li> {/*  */}
        <li>Piattaforma più comune: <strong>{platformCounts}</strong></li> {/*  */}
        <li>Costo totale Wishlist: <strong>{wishlistTotalCost}€</strong></li> {/* Bonus 2  */}
        {Object.entries(gamesByStatus).map(([status, count]) => (
          <li key={status}>
            Giochi "{status}": <strong>{count}</strong>
          </li> // Numero giochi per stato 
        ))}
      </ul>
    </div>
  );
}

export default GameStats;