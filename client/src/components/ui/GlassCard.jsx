function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`
        glass
        w-full
        max-w-md
        rounded-3xl
        border
        border-white/20
        p-10
        shadow-2xl
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default GlassCard;