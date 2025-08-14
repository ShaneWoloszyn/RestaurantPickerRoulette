Restaurant Picker Roulette
A roulette-style restaurant picker with calibrated rotation, responsive layout, and persistent state.
Core Logic
- Slice angle = 360 / N
- Rotation angle = (base + sliceIndex * sliceAngle) % 360
- Rotation uses CSS transform with easing
- Arrow is a separate element, positioned and rotated manually
- Calibration ensures selected slice aligns with arrow tip
Layout
- Wheel uses aspect-ratio: 1 / 1 for circular shape
- Flexbox layout with viewport units for scaling
- Borders and padding tuned to avoid clipping
- Arrow placement adjusted empirically for alignment
State
- Restaurant list stored in localStorage
- Add/remove/reset functionality
- State updates trigger re-render and re-calibration
Styling
- Randomized slice colors using HSL (blue hue range)
- CSS Modules for scoped styles
- Responsive font sizing and spacing
Stack
- React + TypeScript
- Vite
- CSS Modules
- GitHub Pages for deployment
License
MIT
