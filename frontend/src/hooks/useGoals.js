import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

const useGoals = () => {
  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoals();
    fetchCurrentUser();
  }, []);

  // Fetch Logged-in User
  const fetchCurrentUser = async () => {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch Goals
  const fetchGoals = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/tracks");

      const formattedGoals = (data.tracks || []).map((goal) => ({
        ...goal,
        percentage: Math.round(
          (goal.completedDays / goal.duration) * 100
        ),
        remainingDays: goal.duration - goal.completedDays,
      }));

      setGoals(formattedGoals);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch goals"
      );
    } finally {
      setLoading(false);
    }
  };

  // Create Goal
  const createGoal = async (goalData) => {
    try {
      const { data } = await api.post("/tracks", goalData);

      toast.success(data.message);

      await fetchGoals();
      await fetchCurrentUser();

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create goal"
      );

      return false;
    }
  };

  // Update Goal
  const updateGoal = async (id, goalData) => {
    try {
      const { data } = await api.put(`/tracks/${id}`, goalData);

      toast.success(data.message);

      await fetchGoals();
      await fetchCurrentUser();

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update goal"
      );

      return false;
    }
  };

  // Update Daily Progress
  const updateDailyProgress = async (id) => {
    try {
      const { data } = await api.patch(`/tracks/${id}/progress`);

      toast.success(data.message);

      await fetchGoals();
      await fetchCurrentUser();

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update progress"
      );

      return false;
    }
  };

  // Delete Goal
  const deleteGoal = async (id) => {
    try {
      const { data } = await api.delete(`/tracks/${id}`);

      toast.success(data.message);

      await fetchGoals();
      await fetchCurrentUser();

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete goal"
      );

      return false;
    }
  };

  return {
    user,
    goals,
    loading,
    fetchGoals,
    fetchCurrentUser,
    createGoal,
    updateGoal,
    updateDailyProgress,
    deleteGoal,
  };
};

export default useGoals;