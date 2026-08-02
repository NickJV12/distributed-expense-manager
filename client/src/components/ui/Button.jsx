function Button({
    children,
    type = "button",
    loading = false,
    className = "",
}) {
    return (
        <button
        type={type}
        disabled={loading}
        className={`
            w-full
            py-3
            rounded-2xl
            font-semibold
            text-slate-900
            transition-all
            duration-300
            hover:scale-[1.02]
            active:scale-95
            disabled:opacity-50
            disabled:cursor-not-allowed
            bg-linear-to-r
          from-[#A1F1CA]
          to-[#FF6F61]
            shadow-lg
            hover:shadow-xl
            ${className}
            `}
        >
        {loading ? "Loading..." : children}
        </button>
    );
}

export default Button;