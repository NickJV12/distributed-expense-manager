import { Wallet } from "lucide-react";

function Logo() {
  return (
    <div className="flex items-center gap-4">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-300 to-teal-500 shadow-lg">

        <Wallet
          size={28}
          className="text-white"
        />

      </div>

      <div>

        <h1 className="text-3xl font-bold">

          SplitEase

        </h1>

        <p className="text-sm text-gray-500">

          Smart Expense Sharing Made Easy

        </p>

      </div>

    </div>
  );
}

export default Logo;