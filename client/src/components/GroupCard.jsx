import { Users, ArrowRight } from "lucide-react";

function GroupCard({ group, onClick }) {
    return (
        <div onClick={onClick}
        className=" glass
        cursor-pointer
        rounded-3xl
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl">
            <h2 className="text-2xl font-bold">
                {group.group.name}
            </h2>
            <p className="mt-2 text-slate-500">
                {group.group.description || "No description"}
            </p>

            <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Users size={18} />
                    <span>
                        {group.role}
                    </span>
                </div>
                <ArrowRight />
            </div>
        </div>
    );
}

export default GroupCard;