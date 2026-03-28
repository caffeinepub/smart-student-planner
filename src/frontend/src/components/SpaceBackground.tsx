const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: `star-${i}`,
  size: (i * 7 + 3) % 3 === 0 ? 2 : 1,
  top: ((i * 137.5) % 100).toFixed(2),
  left: ((i * 97.3) % 100).toFixed(2),
  color: i % 2 === 0 ? "#ffffff" : "#4FE6FF",
  opacity: (((i * 31) % 60) / 100 + 0.2).toFixed(2),
}));

export function SpaceBackground() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Deep space gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, #1a0533 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, #0a1a3a 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, #050713 0%, #070818 100%)",
        }}
      />
      {/* Glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #9B6CFF, transparent)" }}
      />
      <div
        className="absolute top-3/4 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #4FE6FF, transparent)" }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-8 blur-3xl"
        style={{ background: "radial-gradient(circle, #C65BFF, transparent)" }}
      />
      {/* Stars */}
      {STARS.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            width: star.size,
            height: star.size,
            top: `${star.top}%`,
            left: `${star.left}%`,
            background: star.color,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
}
