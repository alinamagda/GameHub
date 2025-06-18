function GameFilters({ filters, setFilters, genres, platforms }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="filter-group">
      <h4>Filtri</h4>
      <div>
        <label htmlFor="genre-filter">Genere:</label>
        <select id="genre-filter" name="genre" value={filters.genre} onChange={handleChange}>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select> {/* Dropdown filtro genere (valori dinamici)  */}
      </div>

      <div>
        <label htmlFor="platform-filter">Piattaforma:</label>
        <select id="platform-filter" name="platform" value={filters.platform} onChange={handleChange}>
          {platforms.map(platform => (
            <option key={platform} value={platform}>{platform}</option>
          ))}
        </select> {/* Dropdown filtro piattaforma (valori dinamici)  */}
      </div>

      <div>
        <label htmlFor="min-rating-filter">Voto minimo: {filters.minRating}</label>
        <input
          type="range"
          id="min-rating-filter"
          name="minRating"
          min="1"
          max="10"
          value={filters.minRating}
          onChange={handleChange}
       /> {/* Slider per voto minimo (1-10)  */}
      </div>

      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          id="only-wishlist"
          name="onlyWishlist"
          checked={filters.onlyWishlist}
          onChange={handleChange}
        />
        <label htmlFor="only-wishlist">Solo wishlist</label> {/* Checkbox "Solo wishlist"  */}
      </div>
    </div>
  );
}

export default GameFilters;