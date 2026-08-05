
function StatCard({
    title,
    value,
    color = "#3A7F7A",
}) {
    return (
        <div className="glass
      rounded-3xl
      p-6
      shadow-lg
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl">
           <p className="text-slate-500 dark:text-slate-400">
            {title}
           </p>

           <h2 className="mt-3 text-4xl font-bold" 
           style={{ color }}>
            {value}
           </h2>
        </div>
    );
}

export default StatCard;