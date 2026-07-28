import { useMemo, useState } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const Sidebar = ({
  goals = [],
  loading = false,
  onAddGoal,
  onEditGoal,
  onDeleteGoal,
}) => {
  const [search, setSearch] = useState("");

  const filteredGoals = useMemo(() => {
    return goals.filter((goal) =>
      goal.title?.toLowerCase().includes(search.toLowerCase())
    );
  }, [goals, search]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <aside className="sticky top-[73px] flex h-[calc(100vh-73px)] w-80 flex-shrink-0 flex-col border-r bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
      {/* Add Goal */}
      <button
        onClick={onAddGoal}
        className="mb-6 rounded-lg bg-amber-500 py-3 font-semibold text-black transition hover:bg-amber-600"
      >
        + Add Goal
      </button>

      {/* Search */}
      <div className="relative mb-6">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          placeholder="Search goals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-slate-300 py-3 pl-11 pr-4 focus:border-amber-500 focus:outline-none"
        />
      </div>

      <h2 className="mb-4 text-lg font-semibold text-slate-700 dark:text-slate-200">
  My Goals
</h2>

      <div className="flex-1 space-y-3 overflow-y-auto">
        {loading ? (
          <p className="text-center text-slate-500">
            Loading goals...
          </p>
        ) : filteredGoals.length === 0 ? (
          <p className="text-center text-slate-500">
            No goals found.
          </p>
        ) : (
          filteredGoals.map((goal) => (
            <div
            key={goal._id}
            className="overflow-hidden rounded-xl border border-slate-200 p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white">
  {goal.title}
</h3>

                  {goal.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                      {goal.description}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onEditGoal(goal)}
                    className="text-blue-500 transition hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => onDeleteGoal(goal._id)}
                    className="text-red-500 transition hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                    goal.status
                  )}`}
                >
                  {goal.status}
                </span>

                <span className="text-sm text-slate-500">
                  {goal.duration} Days
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};

export default Sidebar;