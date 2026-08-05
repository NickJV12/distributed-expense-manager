import { useState } from "react";
import toast from "react-hot-toast";

import { createGroup } from "../features/groups/groupApi";

function CreateGroupModal({
  isOpen,
  onClose,
  onSuccess,
}) {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await createGroup(form);

      toast.success("Group created successfully");

      setForm({
        name: "",
        description: "",
      });

      onSuccess();

      onClose();

    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Failed to create group"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="glass w-full max-w-md rounded-3xl p-8">

        <h2 className="mb-6 text-3xl font-bold">
          Create Group
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            name="name"
            placeholder="Group Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-white/20 bg-white/20 px-4 py-3 outline-none"
          />

          <textarea
            name="description"
            placeholder="Description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/20 bg-white/20 px-4 py-3 outline-none"
          />

          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border px-5 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-linear-to-r from-[#3A7F7A] to-[#A1F1CA] px-6 py-3 font-semibold text-white"
            >
              {loading ? "Creating..." : "Create"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateGroupModal;