import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import CreateGroupModal from "../components/CreateGroupModal";
import MainLayout from "../layouts/MainLayout";

import GroupCard from "../components/GroupCard";
import EmptyState from "../components/EmptyState";

import {
  getGroups,
} from "../features/groups/groupApi";

import {
  setGroups,
  setLoading,
} from "../features/groups/groupSlice";

function Groups() {
  const dispatch = useDispatch();

  const { groups, loading } = useSelector(
    (state) => state.groups
  );
const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchGroups = async () => {
  dispatch(setLoading(true));

  try {
    const response = await getGroups();

    dispatch(setGroups(response.data));
  } finally {
    dispatch(setLoading(false));
  }
};

useEffect(() => {
  fetchGroups();
}, [dispatch]);

  return (
    <MainLayout>

      <div className="mb-10 flex items-center justify-between">

        <div>

          <h1 className="text-5xl font-bold">
            Groups
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all your expense groups.
          </p>

        </div>

        <button
  onClick={() => setIsModalOpen(true)}
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
    transition
    hover:scale-105
  "
>
  + Create Group
</button>

      </div>

      {loading ? (

        <div className="text-center py-20">
          Loading...
        </div>

      ) : groups.length === 0 ? (

        <EmptyState />

      ) : (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {groups.map((group) => (

            <GroupCard
              key={group.group.id}
              group={group}
            />

          ))}

        </div>

      )}
       <CreateGroupModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSuccess={fetchGroups}
/>
    </MainLayout>
  );
}

export default Groups;