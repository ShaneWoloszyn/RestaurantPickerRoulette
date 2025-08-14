import React, { useEffect, useRef, useState } from 'react';

interface Props {
  items: string[];
  spinTrigger: number;
  onSelect: (cuisine: string) => void;
}

const SIZE = 300; // how big the wheel is

const Wheel: React.FC<Props> = ({ items, spinTrigger, onSelect }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null); // canvas dom
  const [rotation, setRotation] = useState(0); // spin degrees
  const spinning = useRef(false); // flag for spinning
  const chosenIndex = useRef(0); // which slot got picked

  // draw the wheel slices
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas || items.length === 0) return;
    const ctx = canvas.getContext('2d')!;
    const radius = SIZE / 2 - 10; // minus a bit for padding
    const sliceAngle = (2 * Math.PI) / items.length;

    ctx.clearRect(0, 0, SIZE, SIZE);
    items.forEach((label, i) => {
      const start = i * sliceAngle;
      // random blue shades
      const hue = 220;
      const saturation = 50 + Math.random() * 50;
      const lightness = 40 + Math.random() * 30;
      ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

      const end = start + sliceAngle;
      ctx.beginPath();
      ctx.moveTo(SIZE / 2, SIZE / 2);
      ctx.arc(SIZE / 2, SIZE / 2, radius, start, end);
      ctx.closePath();
      ctx.fill();

      // draw text on slice
      ctx.save();
      ctx.translate(SIZE / 2, SIZE / 2);
      ctx.rotate(start + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#333333';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(label, radius - 10, 5);
      ctx.restore();
    });
  };

  // draw again if items change
  useEffect(draw, [items]);

  // spin logic when trigger changes
  useEffect(() => {
    if (spinTrigger === 0 || items.length === 0) return;

    const degPerSlice = 360 / items.length;
    const idx = Math.floor(Math.random() * items.length);
    chosenIndex.current = idx;

    const sliceCenter = idx * degPerSlice + degPerSlice / 2;
    const offset = (270 - sliceCenter + 360) % 360; // top spot
    const extra = 1440; // extra spins
    const target = rotation + extra + offset;

    spinning.current = true;
    setRotation(target);
  }, [spinTrigger]);

  // when spin ends, pick winner
  const handleEnd = () => {
    if (!spinning.current) return;
    spinning.current = false;
    onSelect(items[chosenIndex.current]);
  };

  return (
    <div className="wheel-section" style={{ width: SIZE, height: SIZE }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          transition: spinning.current ? 'transform 4s ease-out' : 'none',
          transform: `rotate(${rotation}deg)`,
        }}
        onTransitionEnd={handleEnd}
      >
        <canvas ref={canvasRef} width={SIZE} height={SIZE} />
      </div>
      <div className="arrow" />
    </div>
  );
};

export default Wheel;