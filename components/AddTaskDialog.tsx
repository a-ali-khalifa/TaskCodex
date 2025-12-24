"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Dialog from "@/components/Dialog";
import { Task } from "@/types/Task";
import { TextField } from "@mui/material";
import { Button } from "@/components/Button";
import { DIFFICULTIES, STATUSES } from "@/lib/enums";

type AddTaskDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

export default function AddTaskDialog({
  isOpen,
  onClose,
  tasks,
  setTasks,
}: AddTaskDialogProps) {
  const [taskData, setTaskData] = useState<Task>({
    id: (Math.random() * 10000).toString(),
    title: "",
    description: "",
    difficulty: "MEDIUM",
    xp: DIFFICULTIES.MEDIUM.xp,
    status: STATUSES.TODO,
    createdAt: "",
    completed: false,
    completedAt: "",
  });

  const taskTitlePlaceholders = [
    "Go for a Jog 👟",
    "Meditate for 30 mins 🧘‍♂️",
    "Drink some water 🫗",
  ];

  const handleSubmit = () => {
    if (!taskData.title.trim()) {
      alert("Task title is required!");
      return;
    }

    // Create task logic here
    console.log("Creating task:", taskData);
    setTasks([...tasks, taskData]);

    // Reset and close
    setTaskData({
      id: (Math.random() * 10000).toFixed(0).toString(),
      title: "",
      description: "",
      difficulty: "MEDIUM",
      xp: DIFFICULTIES.MEDIUM.xp,
      status: STATUSES.TODO,
      createdAt: "",
      completed: false,
      completedAt: "",
    });
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Create New Task">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            required={true}
            value={taskData.title}
            onChange={(e) =>
              setTaskData({ ...taskData, title: e.target.value })
            }
            placeholder={
              taskTitlePlaceholders[
                Math.floor(Math.random() * taskTitlePlaceholders.length)
              ]
            } // Get a random task title as a placeholder
          />

          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            value={taskData.description}
            onChange={(e) =>
              setTaskData({ ...taskData, description: e.target.value })
            }
          />
          <p>Category</p>
          <p>difficulty</p>
          <p>status</p>
          <p>dueDate</p>
          <p>status?</p>
          <Button label="Create" onClick={handleSubmit} />
        </div>
        {/* <input
          type="text"
          placeholder="Task title"
          value={taskData.title}
          onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl"
        />

        <textarea
          placeholder="Description (optional)"
          value={taskData.description}
          onChange={(e) =>
            setTaskData({ ...taskData, description: e.target.value })
          }
          className="w-full px-4 py-3 border border-gray-300 rounded-xl"
          rows={4}
        />

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-100 rounded-xl hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-[#2f4fcc]"
          >
            Create Task
          </button> */}
        {/* </div> */}
      </div>
    </Dialog>
  );
}
