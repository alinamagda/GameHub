import React from 'react';

function Navigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'tutti', label: 'Tutti' },
    { id: 'completato', label: 'Completati' },
    { id: 'in-corso', label: 'In Corso' },
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'abbandonato', label: 'Abbandonati' },
  ]; // Tab orizzontali 

  return (
    <nav className="navigation-tabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={activeTab === tab.id ? 'active' : ''}
          onClick={() => setActiveTab(tab.id)} // useState in App.js per tracciare tab attivo 
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

export default Navigation;