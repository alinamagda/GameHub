import React from 'react';
function Header({ totalGames, searchText, onSearchChange, onToggleTheme, theme }) {
  const gamertag = "Alina";
  return (
    <header className="header-gaming">
      <div>
        <h1>🎮GameHub <span className="gamertag">by {gamertag}</span></h1> {/* */}
        <p className="total-games-counter">Giochi in collezione: {totalGames}</p> {/* */}
      </div>
      <input
        type="text"
        placeholder="Cerca per titolo o genere..."
        className="search-input"
        value={searchText}
        onChange={onSearchChange}
      /> {/* */}
      <button onClick={onToggleTheme} className="theme-toggle-button">
        Passa al tema {theme === 'dark' ? 'chiaro' : 'scuro'}
      </button> {/* Dark/Light Toggle */}
    </header>
  );
}

export default Header;