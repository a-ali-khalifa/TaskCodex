import { IoCheckmark } from "react-icons/io5";
import { Button } from "./Button";

// Unused
//TODO: Implement in future
export const TaskBox = () => {
  return (
    <div className="bg-white border border-black/20 rounded-2xl p-4 mb-4 font-rubik">
      {/* Task Title */}
      <input
        placeholder="📝 What needs to be done?"
        className="w-full text-lg mb-3 px-0 bg-transparent focus:outline-none"
      />

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-green-100 hover:bg-green-200">
            Easy (100 XP)
          </button>
          <button className="px-4 py-2 rounded-lg bg-yellow-100 hover:bg-yellow-200">
            Medium (240 XP)
          </button>
          <button className="px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200">
            Hard (500 XP)
          </button>
        </div>

        <Button label="Create" icon={<IoCheckmark className="text-xl" />} />
      </div>
    </div>
  );
};
