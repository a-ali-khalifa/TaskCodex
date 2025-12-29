import { DIFFICULTIES, STATUSES } from "@/lib/enums";
import { IoClose } from "react-icons/io5";
import { MdCheckCircle, MdOutlineCircle } from "react-icons/md";

export const TaskCard = ({
  title = "task",
  description, //todo: remove
  category,
  difficulty = DIFFICULTIES.MEDIUM,
  xp = DIFFICULTIES.MEDIUM.xp,
  status = STATUSES.TODO,
  completed = false,
  handleDelete = () => {},
}: any) => {
  return (
    <div className="border border-gray-300 rounded-xl p-4 flex justify-between items-center font-rubik">
      <div className="flex gap-2 items-center justify-center">
        {completed ? (
          <MdCheckCircle className="text-2xl text-tertiary cursor-pointer" />
        ) : (
          <MdOutlineCircle className="text-2xl cursor-pointer text-gray-400" />
        )}
        <h3 className="text-xl">{title}</h3>
      </div>
      <div className="flex gap-2">
        {category && (
          <p className="text-md p-2 bg-yellow-100 rounded-xl text-yellow-700">
            {category}
          </p>
        )}
        <p className="text-md p-2 bg-yellow-100 rounded-xl text-yellow-700">
          {`${difficulty}: ${xp} XP`}
        </p>
        <p className="text-sm p-2 border border-gray-400 rounded-xl bg-gray-100 text-gray-600">
          {status}
        </p>
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-all delay-200 ease-in-out cursor-pointer"
          onClick={handleDelete}
        >
          <IoClose className="text-2xl text-gray-400" />
        </button>
      </div>
    </div>
  );
};
