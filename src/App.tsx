import React, { useState, useEffect, useCallback } from 'react';
import CuisineForm from './components/CuisineForm';
import Wheel from './components/Wheel';
import Favorites from './components/Favorites';
import './App.css';

/* fake restaurant db */
const CUISINE_RESTAURANTS: Record<string, string[]> = {
  Italian: ['Pasta Palace', 'Trattoria Roma', 'Luigi’s Table'],
  Japanese: ['Sushi Central', 'Ramen House', 'Tokyo Bites'],
  Mexican: ['Taco Town', 'Cantina Verde', 'El Sombrero'],
  Indian: ['Curry Corner', 'Spice Route', 'Bombay Bistro'],
  American: ['Burger Barn', 'BBQ Pit', 'Liberty Grill'],
  Chinese: ['Dragon Express', 'Wok This Way', 'Golden Panda'],
  Mediterranean: ['Mediterranea', 'Olive Grove', 'Zaytouna'],
  Vietnamese: ['Pho Place', 'Saigon Street', 'Banh Mi Bay'],
};

const LOCAL_STORAGE_KEY = 'restaurant_picker_favorites';

const App: React.FC = () => {
  /* all cuisine options */
  const allCuisines = Object.keys(CUISINE_RESTAURANTS);
  /* what’s checked */
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(allCuisines);
  /* counter to spin wheel */
  const [spinTrigger, setSpinTrigger] = useState(0);
  /* the picked restaurant */
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  /* saved faves */
  const [favorites, setFavorites] = useState<string[]>([]);

  /* load faves from storage once */
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  /* click spin btn */
  const handleSpin = () => {
    if (!selectedCuisines.length) return;
    setSelectedRestaurant(null);
    setSpinTrigger((s) => s + 1);
  };

  /* choose 1 restaurant after wheel stops */
  const handleSelectCuisine = useCallback((cuisine: string) => {
    const options = CUISINE_RESTAURANTS[cuisine];
    const choice = options[Math.floor(Math.random() * options.length)];
    setSelectedRestaurant(choice);
  }, []);

  /* add to faves */
  const saveFavorite = () => {
    if (!selectedRestaurant) return;
    setFavorites((prev) => {
      if (prev.includes(selectedRestaurant)) return prev;
      const next = [...prev, selectedRestaurant];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  /* remove from faves */
  const removeFavorite = (item: string) => {
    setFavorites((prev) => {
      const next = prev.filter((f) => f !== item);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="container">
      <h1 className="header">Restaurant Picker Roulette</h1>
      <div className="main">
        {/* left side: checkboxes + faves list */}
        <div className="left-panel">
          <div className="section">
            <CuisineForm selected={selectedCuisines} onChange={setSelectedCuisines} />
          </div>
          <div className="section">
            <Favorites favorites={favorites} onRemove={removeFavorite} />
          </div>
        </div>

        {/* right side: wheel + buttons */}
        <div className="right-panel">
          <div className="section wheel-section">
            <Wheel
              items={selectedCuisines}
              spinTrigger={spinTrigger}
              onSelect={handleSelectCuisine}
            />
          </div>
          <div className="section" style={{ textAlign: 'center' }}>
            <button onClick={handleSpin} disabled={!selectedCuisines.length}>
              Spin the Wheel
            </button>
            {selectedRestaurant && (
              <div style={{ marginTop: '1rem' }}>
                <h3>You’ll eat at:</h3>
                <p style={{ fontSize: '1.25rem' }}>🍽 {selectedRestaurant}</p>
                <button onClick={saveFavorite}>Save to Favorites</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;