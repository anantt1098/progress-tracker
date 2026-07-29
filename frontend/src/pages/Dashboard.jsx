import { useOutletContext } from "react-router-dom";
import GoalProgressCard from "../components/GoalProgressCard";


const Dashboard = () => {


  const {
    user,
    goals,
    loading,
    updateDailyProgress,
  } = useOutletContext();





  if (loading) {

    return (

      <div className="flex min-h-screen items-center justify-center dark:bg-slate-950">

        <div className="text-center">

          <div className="
          mx-auto
          mb-4
          h-12
          w-12
          animate-spin
          rounded-full
          border-4
          border-blue-500
          border-t-transparent
          " />

          <p className="text-lg font-medium text-gray-600 dark:text-slate-300">
            Loading your goals...
          </p>

        </div>

      </div>

    );

  }





  const totalGoals = goals.length;


  const completedGoals = goals.filter(
    (goal) => goal.status === "Completed"
  ).length;


  const inProgressGoals = goals.filter(
    (goal) => goal.status === "In Progress"
  ).length;


  const notStartedGoals = goals.filter(
    (goal) => goal.status === "Not Started"
  ).length;







  const achievements = [

    {
      title:"First Step",
      icon:"🌱",
      description:"Complete your first goal",
      unlocked: completedGoals >= 1,
    },

    {
      title:"Week Warrior",
      icon:"🔥",
      description:"Maintain a 7 day streak",
      unlocked:user?.streak >= 7,
    },

    {
      title:"Month Master",
      icon:"🏆",
      description:"Maintain a 30 day streak",
      unlocked:user?.streak >= 30,
    },

    {
      title:"Goal Crusher",
      icon:"🎯",
      description:"Complete 10 goals",
      unlocked:completedGoals >= 10,
    },

    {
      title:"Consistency King",
      icon:"⭐",
      description:"Maintain a 60 day streak",
      unlocked:user?.streak >= 60,
    },

  ];







  return (


    <div
      className="
      min-h-screen
      space-y-5
      bg-slate-100
      p-2
      pt-14
      sm:space-y-8
      sm:p-0
      sm:pt-0
      dark:bg-slate-950
      "
    >







      {/* Header */}

      <div className="
      rounded-3xl
      bg-gradient-to-r
      from-blue-600
      to-indigo-700
      p-5
      text-white
      shadow-xl
      sm:p-8
      ">


        <h1 className="text-2xl font-bold sm:text-4xl">

          Daily Progress Dashboard 🚀

        </h1>


        <p className="mt-3 text-blue-100">

          Stay consistent. Complete one step every day and build your streak.

        </p>


      </div>









      {/* New User Guide */}

      {
        goals.length === 0 && (

          <div
            className="
            rounded-2xl
            border
            border-blue-400
            bg-blue-50
            p-5
            text-blue-800
            shadow-md

            dark:border-blue-700
            dark:bg-blue-900/30
            dark:text-blue-200
            "
          >


            <h2 className="text-lg font-bold">

              🎯 Start Your First Goal

            </h2>



            <p className="mt-2 text-sm">

              You don't have any goals yet.

              Open the

              <strong> ☰ menu </strong>

              and click

              <strong> + Add Goal </strong>

              to create your first challenge.

            </p>



          </div>

        )
      }









      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">


        <div className="rounded-2xl bg-white p-4 shadow-md sm:p-6 dark:bg-slate-800">

          <p className="text-gray-500 dark:text-slate-300">
            Total Goals
          </p>


          <h2 className="mt-3 text-4xl font-bold text-blue-600">
            {totalGoals}
          </h2>


        </div>





        <div className="rounded-2xl bg-white p-4 shadow-md sm:p-6 dark:bg-slate-800">

          <p className="text-gray-500 dark:text-slate-300">
            Completed
          </p>


          <h2 className="mt-3 text-4xl font-bold text-green-600">
            {completedGoals}
          </h2>

        </div>





        <div className="rounded-2xl bg-white p-4 shadow-md sm:p-6 dark:bg-slate-800">

          <p className="text-gray-500 dark:text-slate-300">
            In Progress
          </p>


          <h2 className="mt-3 text-4xl font-bold text-blue-600">
            {inProgressGoals}
          </h2>

        </div>





        <div className="rounded-2xl bg-white p-4 shadow-md sm:p-6 dark:bg-slate-800">


          <p className="text-gray-500 dark:text-slate-300">
            🔥 Current Streak
          </p>


          <h2 className="mt-3 text-4xl font-bold text-orange-500">

            {user?.streak || 0}

          </h2>


          <p className="text-sm text-gray-400">

            {user?.streak === 1 ? "Day" : "Days"}

          </p>


        </div>


      </div>






      {/* Keep your existing Goals, Achievements and Summary sections below */}
      {/* No changes needed there */}



    </div>

  );

};


export default Dashboard;