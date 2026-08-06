import { useEffect, useState } from "react";
import { getGroupMembers } from "../features/groups/groupApi";
import toast from "react-hot-toast";

function MembersModal({
  isOpen,
  onClose,
  groupId,
}) {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (!isOpen) return;

    const fetchMembers = async () => {
      try {
        const response = await getGroupMembers(groupId);
        setMembers(response.data);
      } catch {
        toast.error("Unable to load members");
      }
    };

    fetchMembers();
  }, [groupId, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Members
          </h2>

          <button
            onClick={onClose}
            className="text-xl"
          >
            ✕
          </button>

        </div>

        <div className="space-y-3">

          {members.length === 0 ? (
            <p>No members found.</p>
          ) : (
            members.map((member) => (
              <div
                key={member.userId}
                className="rounded-xl border p-3"
              >
                <p className="font-semibold">
                  {member.role}
                </p>

                <p>User ID : {member.userId}</p>
              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default MembersModal;