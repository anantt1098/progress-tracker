import { Outlet } from "react-router-dom";
import { useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

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



      <div className="flex flex-col pt-[73px] lg:flex-row">



        <Sidebar
          goals={goals}
          loading={loading}
          onAddGoal={handleAddGoal}
          onEditGoal={handleEditGoal}
          onDeleteGoal={handleDeleteGoal}
        />





        <div className="flex min-h-[calc(100vh-73px)] flex-1 flex-col">



          <main className="flex-1 bg-slate-100 p-3 sm:p-8 dark:bg-slate-950">


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







          {/* Footer */}
          <footer className="border-t bg-white px-4 py-6 dark:border-slate-800 dark:bg-slate-900">


            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">



              <div className="text-center sm:text-left">


                <h2 className="font-bold text-slate-800 dark:text-white">
                  🚀 ProgressHub
                </h2>


                <p className="text-sm text-slate-500 dark:text-slate-400">

                  Built with ❤️ by Anant Singh

                </p>


              </div>







              <div className="flex items-center gap-4">


                {/* Github */}
                <a
                  href="https://github.com/anantt1098"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-700 transition hover:bg-slate-300 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                  title="GitHub"
                >

                  <FaGithub size={20} />

                </a>





                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/anant-singh-7298a02a3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400"
                  title="LinkedIn"
                >

                  <FaLinkedin size={20} />

                </a>







                {/* Instagram */}
                <a
                  href="https://www.instagram.com/_anantt_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-600 transition hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-400"
                  title="Instagram"
                >

                  <FaInstagram size={20} />

                </a>



              </div>


            </div>





            <p className="mt-5 text-center text-xs text-slate-400 dark:text-slate-500">

              © {new Date().getFullYear()} ProgressHub. All rights reserved.

            </p>



          </footer>




        </div>


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