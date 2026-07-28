import { FaEdit, FaTrash } from "react-icons/fa";

const GoalCard = ({ goal, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      case "Not Started":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">

      <div className="flex items-start justify-between">

        <div className="flex-1">

          <h3 className="text-lg font-semibold text-slate-800">
            {goal.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm text-slate-500">
            {goal.description || "No description available"}
          </p>

        </div>

        <div className="ml-3 flex gap-2">

          <button
            onClick={() => onEdit(goal)}
            className="rounded-md p-2 text-blue-500 transition hover:bg-blue-100"
          >
            <FaEdit />
          </button>

          <button
            onClick={() => onDelete(goal._id)}
            className="rounded-md p-2 text-red-500 transition hover:bg-red-100"
          >
            <FaTrash />
          </button>

        </div>

      </div>

      <div className="mt-4 flex items-center justify-between">

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
            goal.status
          )}`}
        >
          {goal.status}
        </span>

        <span className="text-sm text-slate-500">
          {goal.duration} hrs
        </span>

      </div>

    </div>
  );
};

export default GoalCard;