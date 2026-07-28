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
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

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



  return (
    <div className="min-h-screen space-y-5 bg-slate-100 p-2 sm:space-y-8 sm:p-0 dark:bg-slate-950">


      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-5 text-white shadow-xl sm:p-8">

        <h1 className="text-2xl font-bold sm:text-4xl">
          Daily Progress Dashboard 🚀
        </h1>

        <p className="mt-3 text-blue-100">
          Stay consistent. Complete one step every day and build your streak.
        </p>

      </div>




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

          <h2 className="mt-3 text-4xl font-bold text-yellow-500">
            {inProgressGoals}
          </h2>

        </div>



        <div className="rounded-2xl bg-white p-4 shadow-md sm:p-6 dark:bg-slate-800">

          <p className="flex items-center gap-2 text-gray-500 dark:text-slate-300">
            🔥 Current Streak
          </p>


          <h2 className="mt-3 text-4xl font-bold text-orange-500">
            {user?.streak || 0}
          </h2>


          <p className="text-sm text-gray-400 dark:text-slate-400">
            {user?.streak === 1 ? "Day" : "Days"}
          </p>

        </div>


      </div>






      {/* Goals Container */}
      <div className="rounded-3xl bg-white p-4 shadow-lg sm:p-8 dark:bg-slate-900">


        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">


          <div>

            <h2 className="text-xl font-bold text-gray-800 sm:text-2xl dark:text-white">
              Your Goals
            </h2>


            <p className="text-gray-500 dark:text-slate-400">
              Click the progress circle or button once every day to update your
              progress.
            </p>

          </div>



          <div className="w-fit rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-200">

            {totalGoals} Goals

          </div>


        </div>






        {goals.length === 0 ? (

          <div className="rounded-2xl border-2 border-dashed border-gray-300 py-12 text-center sm:py-20 dark:border-slate-700">


            <div className="text-6xl">
              🎯
            </div>


            <h2 className="mt-4 text-2xl font-bold text-gray-700 dark:text-white">
              No Goals Yet
            </h2>


            <p className="mt-2 text-gray-500 dark:text-slate-400">
              Click <strong>Add Goal</strong> from the sidebar to create your
              first daily challenge.
            </p>


          </div>


        ) : (


          <div className="grid gap-5 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">


            {goals.map((goal) => (

              <GoalProgressCard
                key={goal._id}
                goal={goal}
                onUpdate={updateDailyProgress}
              />

            ))}


          </div>


        )}


      </div>






      {/* Summary */}
      {goals.length > 0 && (

        <div className="rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 p-5 text-white shadow-lg sm:p-8">


          <h2 className="text-xl font-bold sm:text-2xl">
            Progress Summary
          </h2>




          <div className="mt-6 grid gap-6 md:grid-cols-3">


            <div>

              <p className="text-green-100">
                Not Started
              </p>

              <h3 className="text-3xl font-bold">
                {notStartedGoals}
              </h3>

            </div>




            <div>

              <p className="text-green-100">
                In Progress
              </p>

              <h3 className="text-3xl font-bold">
                {inProgressGoals}
              </h3>

            </div>





            <div>

              <p className="text-green-100">
                Completed
              </p>

              <h3 className="text-3xl font-bold">
                {completedGoals}
              </h3>

            </div>


          </div>


        </div>

      )}


    </div>
  );
};

export default Dashboard;