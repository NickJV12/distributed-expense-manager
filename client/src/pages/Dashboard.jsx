import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/StatCard";

import { getDashboardSummary } from "../features/dashboard/dashboardApi";
import {
  setLoading,
  setSummary,
} from "../features/dashboard/dashboardSlice";

import RecentExpenses from "../components/RecentExpenses";

function Dashboard() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { summary, loading } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    const fetchDashboard = async () => {
      dispatch(setLoading(true));

      try {
        const response = await getDashboardSummary();

        dispatch(setSummary(response.data));
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchDashboard();
  }, [dispatch]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex h-[70vh] items-center justify-center">
          <h2 className="text-2xl font-semibold">
            Loading Dashboard...
          </h2>
        </div>
      </MainLayout>
    );
  }
  
   const hour = new Date().getHours();

let greeting = "Good Evening";

if (hour < 12) {
  greeting = "Good Morning";
} else if (hour < 18) {
  greeting = "Good Afternoon";
}

  return (
    <MainLayout>
      <div className="mb-10">
        <h1 className="text-5xl font-bold">
          {greeting}, {user?.name} 👋
        </h1>

        <p className="mt-3 text-lg text-slate-500 dark:text-slate-400">
          Here's what's happening with your shared expenses today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Groups"
          value={summary?.totalGroups ?? 0}
        />

        <StatCard
          title="Expenses"
          value={summary?.totalExpenses ?? 0}
          color="#FF6F61"
        />

        <StatCard
          title="Total Paid"
          value={`₹${summary?.totalPaid ?? 0}`}
        />

        <StatCard
          title="Recent Expenses"
          value={summary?.recentExpenses?.length ?? 0}
          color="#16A34A"
        />

        <RecentExpenses expenses={summary?.recentExpenses || []} />
      </div>
    </MainLayout>
  );
}

export default Dashboard;