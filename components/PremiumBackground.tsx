export function PremiumBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-pvep-bg" />
      <div
        className="absolute inset-0 opacity-95"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(45, 140, 110, 0.2) 0%, transparent 42%), radial-gradient(ellipse at 90% 35%, rgba(201, 162, 39, 0.08) 0%, transparent 36%), radial-gradient(ellipse at 10% 65%, rgba(55, 160, 130, 0.12) 0%, transparent 38%)",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,26,18,0.18)_0%,rgba(7,26,18,0.34)_42%,rgba(7,26,18,0.74)_100%)]" />
    </div>
  );
}
