import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="
        glass
        rounded-full
        p-3
        transition-all
        hover:scale-110
      "
    >
      {dark ? <Sun /> : <Moon />}
    </button>
  );
}

export default ThemeToggle;