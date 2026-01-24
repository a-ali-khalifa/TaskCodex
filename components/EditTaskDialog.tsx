"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
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

type EditTaskDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  taskId: string | null; // Selected task id
  tasks: Task[];
  onEdit: (id: string, updatedData: Partial<Task>) => void;
};

export default function EditTaskDialogProps({
  isOpen,
  onClose,
  taskId,
  tasks,
  onEdit,
}: EditTaskDialogProps) {
  const [taskData, setTaskData] = useState<Task | null>(null);

  useEffect(() => {
    if (isOpen && taskId) {
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        setTaskData(task);
      }
    }
  }, [isOpen, taskId, tasks]);

  const handleEdit = () => {
    if (!taskData?.title.trim()) {
      alert("Task title is required!");
      return;
    }

    console.log("Updating task:", taskData);
    onEdit(taskData.id, taskData);

    // Reset and close
    setTaskData(null);
    onClose();
  };

  // Don't render if no task data loaded yet
  if (!taskData) return null;

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Update Task">
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
                setTaskData({
                  ...taskData,
                  status: e.target.value,
                })
              }
            >
              {Object.entries(STATUSES).map(
                ([key, status]) =>
                  key !== "COMPLETED" && (
                    <MenuItem key={key} value={key}>
                      {status.label}
                    </MenuItem>
                  ),
              )}
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
          <Button label="Update" onClick={handleEdit} />
        </div>
      </div>
    </Dialog>
  );
}
