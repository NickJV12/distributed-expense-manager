import { useState } from "react";
import { Users, Crown } from "lucide-react";

import AddMemberModal from "./AddMemberModal";
import MembersModal from "./MemberModal";

function GroupCard({ group }) {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openMembersModal, setOpenMembersModal] = useState(false);

  return (
    <>
      <div
        className="
          glass
          rounded-3xl
          p-6
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              {group.group.name}
            </h2>

            <p className="mt-2 text-slate-500">
              {group.group.description || "No description"}
            </p>
          </div>

          {group.role === "OWNER" && (
            <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
              <Crown size={16} />
              Owner
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center gap-2 text-slate-600">
          <Users size={18} />
          <span>{group.role}</span>
        </div>

        <div className="mt-8 flex gap-3">

          <button
            onClick={() => setOpenMembersModal(true)}
            className="
              flex-1
              rounded-xl
              border
              border-[#3A7F7A]
              py-2
              font-semibold
              text-[#3A7F7A]
              transition
              hover:bg-[#3A7F7A]
              hover:text-white
            "
          >
            View Members
          </button>

          {group.role === "OWNER" && (
            <button
              onClick={() => setOpenAddModal(true)}
              className="
                flex-1
                rounded-xl
                bg-[#3A7F7A]
                py-2
                font-semibold
                text-white
                transition
                hover:opacity-90
              "
            >
              Add Member
            </button>
          )}

        </div>
      </div>

      <AddMemberModal
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
        groupId={group.group.id}
        onSuccess={() => {}}
      />

      <MembersModal
        isOpen={openMembersModal}
        onClose={() => setOpenMembersModal(false)}
        groupId={group.group.id}
      />
    </>
  );
}

export default GroupCard;