import { useSelector } from "react-redux";
import ThemeToggle from "./ui/ThemeToggle";

function Navbar() {
    const { user } = useSelector((state) => state.auth);
    return (
        <header className="px-8 pt-6">
            <div className="glass flex h-20 items-center justify-between rounded-3xl px-8 shadow-lg">
                <div>
                    <h2 className="text-2xl font-bold text-[#3A7F7A]">
                        SplitEase
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Smart Expense Sharing
                    </p>
                </div>
                <div className="flex items-center gap-5">
                    <ThemeToggle />
                    <div className="flex items-center gap-3">

    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-[#A1F1CA] to-[#3A7F7A] text-lg font-bold text-white">
        {user?.name?.charAt(0).toUpperCase()}
    </div>

    <div>
        <p className="font-semibold text-lg">
            {user?.name}
        </p>

        <p className="text-xs text-slate-500 dark:text-slate-400">
            Welcome back!
        </p>
    </div>

</div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;