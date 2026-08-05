import { Users } from  "lucide-react";

function EmptyState(){
    return (
        <div className="glass rounded-3xl p-12 text-center">
            <Users size={60}
            className="mx-auto mb-5 text-[#3A7F7A]" />
            <h2 className="text-2xl font-bold">
              No Groups Yet
            </h2>
            <p className="mt-3 text-slate-500">
                Create your first group and start sharing expenses.
            </p>
        </div>
    );
}

export default EmptyState;