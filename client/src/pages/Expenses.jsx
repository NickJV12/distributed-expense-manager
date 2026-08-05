import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../layouts/MainLayout";

import { getGroups } from "../features/groups/groupApi";

import {
  getGroupExpenses,
  getBalances,
  getSettlements,
} from "../features/expenses/expenseApi";

import {
  setExpenses,
  setBalances,
  setSettlements,
  setLoading,
} from "../features/expenses/expenseSlice";

function Expenses() {
  const dispatch = useDispatch();

  const [groups, setGroupsList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");

  const {
    expenses,
    balances,
    settlements,
    loading,
  } = useSelector((state) => state.expenses);

  // Load user's groups
  useEffect(() => {
    const loadGroups = async () => {
      try {
        const response = await getGroups();

        setGroupsList(response.data);

        if (response.data.length > 0) {
          setSelectedGroup(response.data[0].group.id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadGroups();
  }, []);

  // Load expense data whenever selected group changes
  useEffect(() => {
    if (!selectedGroup) return;

    const fetchExpenseData = async () => {
      dispatch(setLoading(true));

      try {
        const [
          expenseResponse,
          balanceResponse,
          settlementResponse,
        ] = await Promise.all([
          getGroupExpenses(selectedGroup),
          getBalances(selectedGroup),
          getSettlements(selectedGroup),
        ]);

        dispatch(setExpenses(expenseResponse.data));
        dispatch(setBalances(balanceResponse.data));
        dispatch(setSettlements(settlementResponse.data));
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchExpenseData();
  }, [selectedGroup, dispatch]);

  return (
    <MainLayout>
      <div className="mb-10">
        <h1 className="text-5xl font-bold">
          Expenses
        </h1>

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Manage expenses, balances and settlements.
        </p>
      </div>

      {/* Group Selector */}
      <div className="glass mb-8 rounded-3xl p-6">
        <label className="mb-2 block font-semibold">
          Select Group
        </label>

        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white p-3 dark:border-slate-700 dark:bg-slate-900"
        >
          {groups.map((item) => (
            <option
              key={item.group.id}
              value={item.group.id}
            >
              {item.group.name}
            </option>
          ))}
        </select>
      </div>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold">
          Expense List
        </h2>

        <button
          className="
            rounded-2xl
            bg-linear-to-r
            from-[#3A7F7A]
            to-[#A1F1CA]
            px-6
            py-3
            font-semibold
            text-white
            shadow-lg
          "
        >
          + Add Expense
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="glass rounded-3xl p-10 text-center">
          Loading...
        </div>
      ) : (
        <>
          {/* Expense List */}
          <div className="space-y-4">
            {expenses.length === 0 ? (
              <div className="glass rounded-3xl p-10 text-center">
                No expenses found for this group.
              </div>
            ) : (
              expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="glass rounded-3xl p-6 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {expense.description}
                      </h3>

                      <p className="text-slate-500">
                        Paid by {expense.payer.name}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#FF6F61]">
                        ₹{expense.totalAmount}
                      </p>

                      <p className="text-sm text-slate-500">
                        {expense.participants.length} Participants
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Balances */}
          <div className="glass mt-10 rounded-3xl p-6">
            <h2 className="mb-6 text-2xl font-bold">
              Balances
            </h2>

            {balances.length === 0 ? (
              <p className="text-slate-500">
                No balances available.
              </p>
            ) : (
              balances.map((balance) => (
                <div
                  key={balance.userId}
                  className="mb-3 flex justify-between"
                >
                  <span>{balance.name}</span>

                  <span
                    className={
                      balance.balance >= 0
                        ? "font-semibold text-green-600"
                        : "font-semibold text-red-500"
                    }
                  >
                    ₹{balance.balance}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Settlements */}
          <div className="glass mt-10 rounded-3xl p-6">
            <h2 className="mb-6 text-2xl font-bold">
              Suggested Settlements
            </h2>

            {settlements.length === 0 ? (
              <p className="text-slate-500">
                No settlements required.
              </p>
            ) : (
              settlements.map((settlement, index) => (
                <div
                  key={index}
                  className="mb-3 flex justify-between"
                >
                  <span>
                    {settlement.from.name} ➜ {settlement.to.name}
                  </span>

                  <span className="font-semibold text-[#3A7F7A]">
                    ₹{settlement.amount}
                  </span>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </MainLayout>
  );
}

export default Expenses;