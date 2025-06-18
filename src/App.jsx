import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import GameList from './components/GameList';
import GameFilters from './components/GameFilters';
import GameStats from './components/GameStats';
import { games as mockGames } from './data/mockData';
import './App.css';

function App() {
  const [games, setGames] = useState(mockGames); // setGames per i bonus
  const [activeTab, setActiveTab] = useState('tutti'); // Stato per la navigazione 
  const [filters, setFilters] = useState({ // Stato per i filtri 
    genre: 'tutti',
    platform: 'tutti',
    minRating: 1,
    searchText: '',
    onlyWishlist: false, //  "Solo wishlist"
  });

  const [loading, setLoading] = useState(false); // Per il loading state finto 

  // Simulate a loading state for filters/search
  useEffect(() => {
    if (filters.searchText || filters.genre !== 'tutti' || filters.platform !== 'tutti' || filters.minRating > 1 || filters.onlyWishlist) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500); // Small delay to show loading
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [filters]);


  const filteredGames = useMemo(() => {
    let tempGames = [...games];

    // 1. Filtro per tab di navigazione
    if (activeTab !== 'tutti') {
      tempGames = tempGames.filter(game => game.status === activeTab);
    }

    // 2. Filtri dropdown e slider 
    if (filters.genre !== 'tutti') {
      tempGames = tempGames.filter(game => game.genre.toLowerCase() === filters.genre.toLowerCase());
    }
    if (filters.platform !== 'tutti') {
      tempGames = tempGames.filter(game => game.platform.toLowerCase() === filters.platform.toLowerCase());
    }
    if (filters.minRating > 1) {
      tempGames = tempGames.filter(game => game.rating >= filters.minRating);
    }
    if (filters.onlyWishlist) { // Filtro "Solo wishlist" 
      tempGames = tempGames.filter(game => game.status === 'wishlist');
    }

    // 3. Ricerca testuale 
    if (filters.searchText) {
      const searchTerm = filters.searchText.toLowerCase();
      tempGames = tempGames.filter(
        game => game.title.toLowerCase().includes(searchTerm) ||
                game.genre.toLowerCase().includes(searchTerm)
      );
    }

    return tempGames;
  }, [games, activeTab, filters]);

  // Estrarre generi e piattaforme unici per i dropdown dinamici
  const uniqueGenres = useMemo(() => {
    const genres = new Set(mockGames.map(game => game.genre));
    return ['tutti', ...Array.from(genres).sort()];
  }, []);

  const uniquePlatforms = useMemo(() => {
    const platforms = new Set(mockGames.map(game => game.platform));
    return ['tutti', ...Array.from(platforms).sort()];
  }, []);

  // BONUS: Random Game - aggiunge un effetto visivo
  const [highlightedGameId, setHighlightedGameId] = useState(null);
  const handleRandomGame = () => {
    if (filteredGames.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredGames.length);
      setHighlightedGameId(filteredGames[randomIndex].id);
      setTimeout(() => setHighlightedGameId(null), 1500); // Rimuovi highlight dopo 1.5s
    }
  };

  // BONUS: Dark/Light Toggle
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);


  return (
    <div className={`app-container ${theme}`}>
      <Header
        totalGames={games.length}
        searchText={filters.searchText}
        onSearchChange={(e) => setFilters(prev => ({ ...prev, searchText: e.target.value }))}
        onToggleTheme={toggleTheme} // Passa la funzione per il toggle
        theme={theme}
      />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-content">
        <div className="sidebar">
          <GameFilters
            filters={filters}
            setFilters={setFilters}
            genres={uniqueGenres}
            platforms={uniquePlatforms}
          />
          <GameStats games={filteredGames} totalGames={games.length} /> {/* Passa tutti i giochi per le statistiche globali */}
          <button onClick={handleRandomGame} className="surprise-button">Sorprendimi! (Bonus)</button> {/* Bonus 1  */}
        </div>
        <div className="game-list-section">
          {loading ? (
            <p className="loading-message">Caricamento giochi...</p> // Loading state finto 
          ) : filteredGames.length === 0 ? (
            <p className="no-games-found">Nessun gioco trovato con i filtri attuali. Prova a modificarli!</p> // Nessun gioco trovato 
          ) : (
            <>
              <p className="results-counter">Mostrando {filteredGames.length} di {games.length} giochi</p> {/* Contatore risultati  */}
              <GameList games={filteredGames} highlightedGameId={highlightedGameId} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;