import { useEffect, useState } from 'react';

const InteractiveBackground = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    size: number;
    left: number;
    animationDelay: number;
  }>>([]);

  const [shapes, setShapes] = useState<Array<{
    id: number;
    type: 'circle' | 'square' | 'triangle';
    size: number;
    left: number;
    animationDelay: number;
  }>>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2, // 2-6px
      left: Math.random() * 100, // 0-100%
      animationDelay: Math.random() * 20, // 0-20s
    }));

    // Generate floating shapes
    const newShapes = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      type: (['circle', 'square', 'triangle'] as const)[Math.floor(Math.random() * 3)],
      size: Math.random() * 60 + 40, // 40-100px
      left: Math.random() * 100, // 0-100%
      animationDelay: Math.random() * 30, // 0-30s
    }));

    setParticles(newParticles);
    setShapes(newShapes);
  }, []);

  const renderShape = (shape: typeof shapes[0]) => {
    const baseClasses = "shape absolute opacity-5";
    const style = {
      width: `${shape.size}px`,
      height: `${shape.size}px`,
      left: `${shape.left}%`,
      animationDelay: `${shape.animationDelay}s`,
    };

    switch (shape.type) {
      case 'circle':
        return (
          <div
            key={shape.id}
            className={`${baseClasses} rounded-full border-2 border-primary`}
            style={style}
          />
        );
      case 'square':
        return (
          <div
            key={shape.id}
            className={`${baseClasses} border-2 border-primary rotate-45`}
            style={style}
          />
        );
      case 'triangle':
        return (
          <div
            key={shape.id}
            className={`${baseClasses}`}
            style={{
              ...style,
              width: '0',
              height: '0',
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid hsl(var(--primary))`,
              opacity: '0.03',
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Particle Background */}
      <div className="interactive-bg">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              animationDelay: `${particle.animationDelay}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Shapes */}
      <div className="floating-shapes fixed inset-0 -z-10">
        {shapes.map(renderShape)}
      </div>
    </>
  );
};

export default InteractiveBackground;