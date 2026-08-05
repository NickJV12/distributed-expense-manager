import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";

import { getGroups } from "../features/groups/groupApi";
import { createExpense } from "../features/expenses/expenseApi";

function AddExpense() {
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);

  // TODO: Load members for the selected group using getGroupMembers().

  const [form, setForm] = useState({
    groupId: "",
    description: "",
    totalAmount: "",
    paidBy: "",
    participants: [],
  });

  const loadGroups = async () => {
    try {
      const response = await getGroups();
      setGroups(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createExpense(form.groupId, {
        description: form.description,
        totalAmount: Number(form.totalAmount),
        paidBy: Number(form.paidBy),
        participants: form.participants,
      });

      toast.success("Expense Added");

      navigate("/expenses");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Failed to create expense"
      );
    }
  };

  return (
    <MainLayout>
      <h1 className="text-4xl font-bold mb-8">
        Add Expense
      </h1>

      <form
        onSubmit={handleSubmit}
        className="glass rounded-3xl p-8 space-y-5"
      >
        <select
          name="groupId"
          value={form.groupId}
          onChange={handleChange}
          required
          className="w-full rounded-xl p-3"
        >
          <option value="">
            Select Group
          </option>

          {groups.map((g) => (
            <option
              key={g.group.id}
              value={g.group.id}
            >
              {g.group.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full rounded-xl p-3"
        />

        <input
          type="number"
          name="totalAmount"
          placeholder="Amount"
          value={form.totalAmount}
          onChange={handleChange}
          required
          className="w-full rounded-xl p-3"
        />

        <input
          type="number"
          name="paidBy"
          placeholder="Paid By (User ID)"
          value={form.paidBy}
          onChange={handleChange}
          required
          className="w-full rounded-xl p-3"
        />

        <button
          className="
          w-full
          rounded-xl
          bg-linear-to-r
          from-[#3A7F7A]
          to-[#A1F1CA]
          py-3
          font-semibold
          text-white
          "
        >
          Create Expense
        </button>
      </form>
    </MainLayout>
  );
}

export default AddExpense;