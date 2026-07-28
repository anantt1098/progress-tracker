import { Outlet } from "react-router-dom";
import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AddGoalModal from "../components/AddGoalModal";
import useGoals from "../hooks/useGoals";

const DashboardLayout = () => {
  const {
    user,
    goals,
    loading,
    fetchGoals,
    createGoal,
    updateGoal,
    updateDailyProgress,
    deleteGoal,
  } = useGoals();


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);


  const handleAddGoal = () => {
    setSelectedGoal(null);
    setIsModalOpen(true);
  };


  const handleEditGoal = (goal) => {
    setSelectedGoal(goal);
    setIsModalOpen(true);
  };


  const handleCloseModal = () => {
    setSelectedGoal(null);
    setIsModalOpen(false);
  };


  const handleDeleteGoal = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this goal?"
    );

    if (!confirmDelete) return;

    await deleteGoal(id);
  };


  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">

      <Navbar />


      <div className="flex pt-[73px]">


        <Sidebar
          goals={goals}
          loading={loading}
          onAddGoal={handleAddGoal}
          onEditGoal={handleEditGoal}
          onDeleteGoal={handleDeleteGoal}
        />



        <main className="min-h-[calc(100vh-73px)] flex-1 bg-slate-100 p-8 dark:bg-slate-950">


          <Outlet
            context={{
              user,
              goals,
              loading,
              fetchGoals,
              updateDailyProgress,
            }}
          />


        </main>


      </div>



      <AddGoalModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editGoal={selectedGoal}
        createGoal={createGoal}
        updateGoal={updateGoal}
      />


    </div>
  );
};

export default DashboardLayout;