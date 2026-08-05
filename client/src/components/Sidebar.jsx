import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import {
    LayoutDashboard,
    Users,
    Receipt,
    BarChart3,
    LogOut
} from "lucide-react";

function Sidebar() {
    const menu = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard
        },
        {
            name: "Groups",
            path: "/groups",
            icon: Users
        },
        {
            name: "Expenses",
            path: "/expenses",
            icon: Receipt
        },
        {
            name: "Analytics",
            path: "/analytics",
            icon: BarChart3
        },
    ];
     
    const dispatch = useDispatch();
const navigate = useNavigate();

const handleLogout = () => {
  dispatch(logout());

  toast.success("Logged out successfully");

  navigate("/login");
};

    return (
        <aside className="w-72 p-6">
          <div className="glass flex h-full flex-col rounded-3xl p-6">
             <h1 className="mb-10 text-4xl font-bold">
                SplitEase
             </h1>

             <nav className="space-y-3">
                {menu.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink key={item.name} to={item.path} className={({ isActive }) => 
                        `flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 
                        ${isActive ? "bg-linear-to-r from-[#A1F1CA] to-[#FFD1C7] shadow-lg" : "hover:bg-white/20"}`}>
                        <Icon size={22} />
                        {item.name}
                        </NavLink>
                    );
                })}
             </nav>
             <div className="mt-auto">
               <button  onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-red-100 dark:hover:bg-red-900/20">
                <LogOut size={22} />
                Logout
               </button>
             </div>
          </div>
        </aside>
    );
}

export default Sidebar;