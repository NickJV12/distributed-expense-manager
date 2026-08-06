import { useState } from "react";
import toast from "react-hot-toast";
import { addMember } from "../features/groups/groupApi";

function AddMemberModal({
    isOpen,
    onClose,
    groupId,
    onSuccess,
}) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    if(!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email.trim()){
            toast.error("Please enter an email");
            return;
        }

        try{
            setLoading(true);
            await addMember(groupId, email);
            toast.success("Member added successfully");
            setEmail("");
            if(onSuccess)onSuccess();
            onClose();
        } catch(err) {
             toast.error(err.response?.data?.message || "Unable to add member");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
           <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
              <h2 className="mb-6 text-2xl font-bold">
                 Add Member
              </h2>
              <form onSubmit={handleSubmit}>
                <input
                type="email"
            placeholder="Enter member email"
            className="mb-6 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-[#3A7F7A]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
                />
                <div className="flex justify-end gap-3">
                 <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-5 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#3A7F7A] px-5 py-2 font-semibold text-white hover:opacity-90"
            >
              {loading ? "Adding..." : "Add Member"}
            </button>
                </div>
              </form>
           </div>
        </div>
    );
}

export default AddMemberModal;