import {
  Category,
  DIFFICULTIES,
  Difficulty,
  Status,
  STATUSES,
} from "@/lib/enums";
import { IoClose } from "react-icons/io5";
import { MdCheckCircle, MdOutlineCircle } from "react-icons/md";

type TaskCardProps = {
  title?: string;
  description?: string;
  category?: Category | string;
  difficulty?: Difficulty;
  xp?: number;
  createdAt?: string;
  status?: Status;
  completed?: boolean;
  onToggleCompletion?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export const TaskCard = ({
  title = "task",
  description,
  category,
  difficulty = "MEDIUM",
  xp = DIFFICULTIES.MEDIUM.xp,
  status = "TODO",
  completed = false,
  onToggleCompletion = () => {},
  onEdit = () => {},
  onDelete = () => {},
}: TaskCardProps) => {
  return (
    <div className="border border-gray-300 rounded-xl p-4 flex justify-between items-center font-rubik">
      <div className="flex gap-2 items-center justify-center">
        {completed ? (
          <MdCheckCircle
            className="text-2xl text-tertiary cursor-pointer"
            onClick={onToggleCompletion}
          />
        ) : (
          <MdOutlineCircle
            className="text-2xl cursor-pointer text-gray-400"
            onClick={onToggleCompletion}
          />
        )}
        <button className="text-xl cursor-pointer" onClick={onEdit}>
          {title}
        </button>
      </div>
      <div className="flex gap-2">
        {category && (
          <p className="text-md p-2 bg-yellow-100 rounded-xl text-yellow-700">
            {category}
          </p>
        )}
        <p
          style={{
            color: DIFFICULTIES[difficulty].color,
            backgroundColor: DIFFICULTIES[difficulty].background,
          }}
          className={"text-md p-2 rounded-xl"}
        >
          {`${DIFFICULTIES[difficulty].label} • ${xp} XP`}
        </p>
        <p className={`text-sm p-2 rounded-lg ${STATUSES[status].style}`}>
          {status === "TODO" ? status : STATUSES[status].label}
          {/* "Todo -> TODO" */}
        </p>
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-all delay-200 ease-in-out cursor-pointer"
          onClick={onDelete}
        >
          <IoClose className="text-2xl text-gray-400" />
        </button>
      </div>
    </div>
  );
};
