import React from 'react';

interface Props {
  selected: string[];
  onChange: (cuisines: string[]) => void;
}

// list of all cuisine names
export const CUISINES = [
  'Italian',
  'Japanese',
  'Mexican',
  'Indian',
  'American',
  'Chinese',
  'Mediterranean',
  'Vietnamese',
];

const CuisineForm: React.FC<Props> = ({ selected, onChange }) => {
  // add/remove one cuisine
  const toggle = (c: string) =>
    onChange(selected.includes(c) ? selected.filter((x) => x !== c) : [...selected, c]);

  return (
    <div>
      <h3>Select Cuisines</h3>
      <div className="checkbox-box">
        <div className="checkbox-list">
          {CUISINES.map((c) => (
            <label key={c}>
              <input
                type="checkbox"
                checked={selected.includes(c)}
                onChange={() => toggle(c)}
              />
              {c}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CuisineForm;