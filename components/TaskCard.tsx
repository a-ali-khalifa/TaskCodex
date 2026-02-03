import {
  Category,
  DIFFICULTIES,
  Difficulty,
  Status,
  STATUSES,
} from "@/lib/enums";
import { useCompletionTimer } from "@/lib/useCompletionTimer";
import { Task } from "@/types/Task";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { MdOutlineCircle } from "react-icons/md";

type TaskCardProps = {
  task: Task;
  onToggleCompletion?: () => void;
  onToggleStatus?: () => void;
  onTimerComplete?: (taskId: string) => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export const TaskCard = ({
  task,
  onToggleCompletion = () => {},
  onToggleStatus = () => {},
  onTimerComplete = () => {},
  onEdit = () => {},
  onDelete = () => {},
}: TaskCardProps) => {
  const progress = useCompletionTimer(task, onTimerComplete);
  const isTimerActive = task.completed && task.deletionTimer;
  let countdown = Math.ceil((4000 - (Date.now() - task.deletionTimer!)) / 1000);
  return (
    <div className="relative border border-gray-300 rounded-xl p-4 overflow-hidden font-rubik">
      {/* Animated Background Bar */}
      {isTimerActive && (
        <div
          className="absolute inset-0 bg-linear-to-r from-green-200 via-green-300 to-green-400 transition-all duration-50"
          style={{
            width: `${progress}%`,
            opacity: 0.3,
          }}
        />
      )}

      {/* Content - relative to appear above background */}
      <div className="relative flex justify-between items-center">
        <div className="flex gap-2 items-center justify-center">
          {task.completed ? (
            <IoMdCheckmarkCircleOutline
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
            {task.title}
          </button>

          {/* Timer countdown text */}
          {isTimerActive && countdown > 0 && (
            <span className="text-xs text-green-700 font-medium ml-2">
              {countdown}s
            </span>
          )}
        </div>

        <div className="flex gap-2">
          {task.category && (
            <p className="text-md p-2 bg-gray-100 rounded-xl text-gray-600">
              {task.category}
            </p>
          )}
          <p
            style={{
              color: DIFFICULTIES[task.difficulty].color,
              backgroundColor: DIFFICULTIES[task.difficulty].background,
            }}
            className="text-md p-2 rounded-xl"
          >
            {DIFFICULTIES[task.difficulty].label} • {task.xp} XP
          </p>
          <p
            className={`text-sm p-2 rounded-lg cursor-pointer ${STATUSES[task.status].style}`}
            onClick={onToggleStatus}
          >
            {task.status === "TODO" ? task.status : STATUSES[task.status].label}
          </p>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-all delay-150 ease-in cursor-pointer"
            onClick={onDelete}
          >
            <IoClose className="text-2xl text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
