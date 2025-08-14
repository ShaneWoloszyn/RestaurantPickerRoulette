import React from 'react';

interface Props {
  favorites: string[];
  onRemove: (item: string) => void;
}

const Favorites: React.FC<Props> = ({ favorites, onRemove }) => {
  if (favorites.length === 0) return null; // no faves, show nothing

  return (
    <>
      <h3>Your Favorites</h3>
      <ul className="favorites-list">
        {favorites.map((item) => (
          <li key={item}>
            <span>{item}</span>
            {/* remove one fave */}
            <button onClick={() => onRemove(item)}>Remove</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Favorites;