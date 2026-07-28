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
  });

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (editGoal) {
      setFormData({
        title: editGoal.title || "",
        description: editGoal.description || "",
        duration: editGoal.duration || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        duration: "",
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
        status: editGoal?.status || "Not Started",
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

      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl dark:bg-slate-900">

        <h2 className="mb-6 text-2xl font-bold text-slate-800 dark:text-white">
          {editGoal ? "Edit Goal" : "Add New Goal"}
        </h2>


        <form onSubmit={handleSubmit} className="space-y-5">


          <div>
            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Goal title"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-amber-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              required
            />
          </div>



          <div>
            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Goal description"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-amber-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>



          <div>
            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
              Duration (Days)
            </label>

            <input
              type="number"
              name="duration"
              min="1"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g. 30"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-amber-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              required
            />
          </div>



          <div className="flex justify-end gap-4 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-5 py-2 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
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