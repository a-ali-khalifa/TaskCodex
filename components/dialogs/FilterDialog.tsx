"use client";

import { useState } from "react";
import { DIFFICULTIES, CATEGORIES, STATUSES } from "@/lib/enums";
import Dialog from "@/components/dialogs/Dialog";

export type TaskFilters = {
  status: string[];
  difficulty: string[];
  category: string[];
};

type FilterDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: TaskFilters) => void;
  currentFilters: TaskFilters;
};

export default function FilterDialog({
  isOpen,
  onClose,
  onApply,
  currentFilters,
}: FilterDialogProps) {
  const [filters, setFilters] = useState<TaskFilters>(currentFilters);

  const toggleFilter = (category: keyof TaskFilters, value: string) => {
    setFilters((prev) => {
      const current = prev[category];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      return { ...prev, [category]: updated };
    });
  };

  const clearAll = () => {
    setFilters({ status: [], difficulty: [], category: [] });
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Filter Tasks">
      <div className="max-h-[60vh] overflow-y-auto">
        {/* Status */}
        <div className="mb-4">
          <div className="flex gap-2 mb-3 justify-start items-end text-sm text-gray-700 font-semibold">
            <h4>Status</h4>
            {filters.status.length > 0 && <p>{filters.status.length}</p>}
          </div>
          <div className="space-y-2">
            {Object.entries(STATUSES).map(([key, value]) => (
              <label
                key={key}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filters.status.includes(key)}
                  onChange={() => toggleFilter("status", key)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span
                  className={`flex-1 text-sm font-medium px-3 py-1 rounded-lg ${value.style}`}
                >
                  {value.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div className="mb-6">
          <div className="flex gap-2 justify-start items-end text-sm font-semibold text-gray-700 mb-3">
            <h4>Difficulty</h4>
            {filters.difficulty.length > 0 && (
              <p>{filters.difficulty.length}</p>
            )}
          </div>
          <div className="space-y-2">
            {Object.entries(DIFFICULTIES).map(([key, diff]) => (
              <label
                key={key}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filters.difficulty.includes(key)}
                  onChange={() => toggleFilter("difficulty", key)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span
                  style={{
                    backgroundColor: diff.background,
                    color: diff.color,
                  }}
                  className="flex-1 text-sm font-semibold px-3 py-1 rounded-lg"
                >
                  {diff.label} ({diff.xp} XP)
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <div className="flex gap-2 mb-3 justify-start items-end text-sm text-gray-700 font-semibold">
            <h4>Category</h4>
            {filters.category.length > 0 && <p>{filters.category.length}</p>}
          </div>
          <div className="space-y-2">
            {Object.values(CATEGORIES).map((category) => (
              <label
                key={category}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filters.category.includes(category)}
                  onChange={() => toggleFilter("category", category)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="flex-1 text-sm font-medium text-gray-700">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex gap-3 mt-2">
        <button
          onClick={clearAll}
          className="flex-1 px-4 py-3 bg-white text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-colors border border-gray-200"
        >
          Clear All
        </button>
        <button
          onClick={handleApply}
          className="flex-1 px-4 py-3 bg-linear-to-r from-primary to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          Apply Filters
        </button>
      </div>
    </Dialog>
  );
}
