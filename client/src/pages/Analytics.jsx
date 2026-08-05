import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../layouts/MainLayout";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  getDashboardSummary,
} from "../features/analytics/analyticsApi";

import {
  setSummary,
  setLoading,
} from "../features/analytics/analyticsSlice";

function Analytics() {
  const dispatch = useDispatch();

  const { summary, loading } = useSelector(
    (state) => state.analytics
  );

  useEffect(() => {
    const fetchAnalytics = async () => {
      dispatch(setLoading(true));

      try {
        const response = await getDashboardSummary();

        dispatch(setSummary(response.data));
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchAnalytics();
  }, [dispatch]);

  if (loading || !summary) {
    return (
      <MainLayout>
        <div className="flex h-[60vh] items-center justify-center">
          <h2 className="text-2xl font-semibold">
            Loading Analytics...
          </h2>
        </div>
      </MainLayout>
    );
  }

  const averageExpense =
    summary.totalExpenses > 0
      ? (
          summary.totalPaid /
          summary.totalExpenses
        ).toFixed(2)
      : 0;

  const chartData = [
    {
      name: "Groups",
      value: summary.totalGroups,
    },
    {
      name: "Expenses",
      value: summary.totalExpenses,
    },
    {
      name: "Paid",
      value: summary.totalPaid,
    },
  ];

  return (
    <MainLayout>
      <div className="mb-10">
        <h1 className="text-5xl font-bold">
          Analytics
        </h1>

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Visualize your expense statistics.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="glass rounded-3xl p-6">
          <h3 className="text-sm text-slate-500">
            Total Groups
          </h3>

          <p className="mt-3 text-4xl font-bold">
            {summary.totalGroups}
          </p>
        </div>

        <div className="glass rounded-3xl p-6">
          <h3 className="text-sm text-slate-500">
            Total Expenses
          </h3>

          <p className="mt-3 text-4xl font-bold">
            {summary.totalExpenses}
          </p>
        </div>

        <div className="glass rounded-3xl p-6">
          <h3 className="text-sm text-slate-500">
            Total Paid
          </h3>

          <p className="mt-3 text-4xl font-bold text-[#3A7F7A]">
            ₹{summary.totalPaid}
          </p>
        </div>

        <div className="glass rounded-3xl p-6">
          <h3 className="text-sm text-slate-500">
            Average Expense
          </h3>

          <p className="mt-3 text-4xl font-bold text-[#FF6F61]">
            ₹{averageExpense}
          </p>
        </div>

      </div>

      {/* Chart */}

      <div className="glass mt-10 rounded-3xl p-8">

        <h2 className="mb-8 text-2xl font-bold">
          Expense Overview
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <BarChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#3A7F7A"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* Recent Expenses */}

      <div className="glass mt-10 rounded-3xl p-8">

        <h2 className="mb-6 text-2xl font-bold">
          Recent Expenses
        </h2>

        {summary.recentExpenses.length === 0 ? (

          <p>No recent expenses.</p>

        ) : (

          summary.recentExpenses.map((expense) => (

            <div
              key={expense.id}
              className="mb-4 rounded-2xl border border-white/20 p-5"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="font-semibold">
                    {expense.description}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {expense.group.name}
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-bold text-[#3A7F7A]">
                    ₹{expense.totalAmount}
                  </p>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </MainLayout>
  );
}

export default Analytics;