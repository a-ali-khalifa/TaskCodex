"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Dialog from "@/components/Dialog";
import { Task } from "@/types/Task";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Button } from "@/components/Button";
import { CATEGORIES, DIFFICULTIES, STATUSES } from "@/lib/enums";

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
    category: "",
    difficulty: "MEDIUM",
    xp: DIFFICULTIES.MEDIUM.xp,
    status: STATUSES.TODO,
    createdAt: "",
    dueDate: "",
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
    taskData.createdAt = new Date().toISOString();
    console.log("Creating task:", taskData);
    setTasks([...tasks, taskData]);

    // Reset and close
    setTaskData({
      id: (Math.random() * 10000).toFixed(0).toString(),
      title: "",
      description: "",
      category: "",
      difficulty: "MEDIUM",
      xp: DIFFICULTIES.MEDIUM.xp,
      status: STATUSES.TODO,
      createdAt: "",
      dueDate: "",
      completed: false,
      completedAt: "",
    });
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Create New Task">
      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          {/* TITLE */}
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

          {/* DESCRIPTION */}
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            value={taskData.description}
            onChange={(e) =>
              setTaskData({ ...taskData, description: e.target.value })
            }
          />

          {/* CATEGORY */}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={taskData.category}
              label="Category"
              onChange={(e) =>
                setTaskData({ ...taskData, category: e.target.value })
              }
            >
              {Object.values(CATEGORIES).map((category) => (
                <MenuItem value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* DIFFICULTY */}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={taskData.difficulty}
              label="Difficulty"
              onChange={(e) =>
                setTaskData({
                  ...taskData,
                  difficulty: e.target.value,
                  xp: DIFFICULTIES[e.target.value as keyof typeof DIFFICULTIES]
                    .xp,
                })
              }
            >
              {Object.entries(DIFFICULTIES).map(([key, diff]) => (
                <MenuItem
                  key={key}
                  value={key}
                >{`${diff.label} (${diff.xp} XP)`}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* STATUS */}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={taskData.status}
              label="Status"
              onChange={(e) =>
                setTaskData({ ...taskData, status: e.target.value })
              }
            >
              {Object.values(STATUSES).map((status) => (
                <MenuItem value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* DUE DATE & TIME */}
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600 ml-1">
              Due by:
            </label>
            <input
              type="datetime-local"
              value={taskData.dueDate}
              onChange={(e) =>
                setTaskData({ ...taskData, dueDate: e.target.value })
              }
              className="p-3 rounded-lg border border-gray-300"
            />
          </div>

          {/* ACTION BUTTONS */}
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
