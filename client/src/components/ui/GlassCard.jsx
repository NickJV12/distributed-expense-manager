function GlassCard({ children, className = "" }) {
    return(
        <div className={`
        glass
        rounded-3xl
        p-8
        shadow-2xl
        border
        border-white/20
        ${className}
        `}>
            {children}
        </div>
    );
}

export default GlassCard