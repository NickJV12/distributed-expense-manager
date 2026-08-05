import { Receipt } from "lucide-react";

function RecentExpenses({ expenses = [] }) {
    return (
        <div className="glass mt-10 rounded-3xl p-6 shadow-lg">
            <div className="mb-6 flex items-center gap-3">
                <Receipt className="text-[#3A7F7A]" size={24} />

                <h2 className="text-2xl font-bold">
                    Recent Expenses
                </h2>
            </div>

            {expenses.length === 0 ? (
                <div className="py-10 text-center text-slate-500">
                   No expenses yet.
                </div>
            ): (
                <div className="space-y-4">
                   {expenses.map((expense) => (
                    <div key={expense.id} className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md transition hover:scale-[1.01]">
                        <div>
                            <h3 className="font-semibold text-lg">
                                {expense.description}
                            </h3>
                            <p className="text-sm text-slate-500">
                                {expense.group?.name}
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="font-bold text-lg text-[#FF6F61]">
                              ₹{expense.totalAmount}  
                            </p>
                            <p className="text-xs text-slate-400">
                                {new Date(expense.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                   ))}
                </div>
            )}
        </div>
    );
}

export default RecentExpenses;
