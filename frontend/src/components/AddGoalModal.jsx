import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddGoalModal = ({
  isOpen,
  onClose,
  editGoal = null,
  createGoal,
  updateGoal,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    status: "Not Started",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editGoal) {
      setFormData({
        title: editGoal.title || "",
        description: editGoal.description || "",
        duration: editGoal.duration || "",
        status: editGoal.status || "Not Started",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        duration: "",
        status: "Not Started",
      });
    }
  }, [editGoal, isOpen]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const payload = {
        ...formData,
        duration: Number(formData.duration),
        status: editGoal ? formData.status : "Not Started",
      };

      let success = false;

      if (editGoal) {
        success = await updateGoal(editGoal._id, payload);
      } else {
        success = await createGoal(payload);
      }

      if (success) {
        onClose();
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
        <h2 className="mb-6 text-2xl font-bold">
          {editGoal ? "Edit Goal" : "Add New Goal"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block font-medium">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Goal title"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-amber-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Goal description"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Duration (Days)
            </label>

            <input
              type="number"
              name="duration"
              min="1"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g. 30"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-amber-500 focus:outline-none"
              required
            />
          </div>

          {editGoal && (
            <div>
              <label className="mb-2 block font-medium">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-amber-500 focus:outline-none"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          )}

          <div className="flex justify-end gap-4 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-5 py-2 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-amber-500 px-6 py-2 font-semibold text-black transition hover:bg-amber-600 disabled:opacity-60"
            >
              {loading
                ? "Saving..."
                : editGoal
                ? "Update Goal"
                : "Add Goal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGoalModal;