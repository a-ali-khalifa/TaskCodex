import Image from "next/image";
import NoTasks from "@/public/images/no_tasks.svg";

const EmptyMessage = () => {
  return (
    <div className="flex flex-col p-4 gap-2 items-center justify-center font-rubik text-gray-600 border-2 border-dashed border-gray-300 rounded-lg">
      <Image src={NoTasks} alt={"No Tasks"} className="size-40 " />
      <p>{`No tasks found. Add a task to get started.`}</p>
    </div>
  );
};

export default EmptyMessage;
