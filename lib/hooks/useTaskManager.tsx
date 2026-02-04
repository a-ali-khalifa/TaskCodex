import { useState, useMemo } from "react";
import { Task } from "@/types/Task";
import { DIFFICULTIES, Difficulty } from "@/lib/enums";
import { TaskFilters } from "@/components/FilterDialog";

export function useTaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [recentlyCompleted, setRecentlyCompleted] = useState<Task[]>([]);
  const [activeFilters, setActiveFilters] = useState<TaskFilters>({
    status: [],
    difficulty: [],
    category: [],
  });

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    if (activeFilters.status.length > 0) {
      filtered = filtered.filter((task) =>
        activeFilters.status.includes(task.status),
      );
    }

    if (activeFilters.difficulty.length > 0) {
      filtered = filtered.filter((task) =>
        activeFilters.difficulty.includes(task.difficulty),
      );
    }

    if (activeFilters.category.length > 0) {
      filtered = filtered.filter(
        (task) =>
          task.category && activeFilters.category.includes(task.category),
      );
    }

    return filtered;
  }, [tasks, activeFilters]);

  const addTask = (title: string, difficulty: Difficulty) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      category: "",
      description: "",
      difficulty,
      xp: DIFFICULTIES[difficulty].xp,
      status: "TODO",
      createdAt: new Date().toISOString(),
      completed: false,
      completedAt: null,
      dueDate: "",
    };

    setTasks((prev) => [...prev, newTask]);
    return newTask;
  };

  const updateTask = (taskId: string, updatedData: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, ...updatedData } : task,
      ),
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const moveToRecentlyCompleted = (taskId: string) => {
    const completedTask = tasks.find((t) => t.id === taskId);
    if (completedTask) {
      setRecentlyCompleted((prev) => [completedTask, ...prev].slice(0, 5));
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
  };

  const undoCompletion = (taskId: string) => {
    const task = recentlyCompleted.find((t) => t.id === taskId);
    if (task) {
      setTasks((prev) => [
        ...prev,
        {
          ...task,
          completed: false,
          status: "TODO",
          completedAt: null,
          deletionTimer: undefined,
        },
      ]);
      setRecentlyCompleted((prev) => prev.filter((t) => t.id !== taskId));
      return task;
    }
  };

  return {
    tasks,
    setTasks,
    recentlyCompleted,
    filteredTasks,
    activeFilters,
    setActiveFilters,
    addTask,
    updateTask,
    deleteTask,
    moveToRecentlyCompleted,
    undoCompletion,
  };
}
