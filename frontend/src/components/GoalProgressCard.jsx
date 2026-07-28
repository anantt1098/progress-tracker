import React from "react";

const GoalProgressCard = ({ goal, onUpdate }) => {
  const percentage = Math.round(
    (goal.completedDays / goal.duration) * 100
  );

  const remainingDays = goal.duration - goal.completedDays;

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (percentage / 100) * circumference;


  return (
    <div className="flex min-h-[520px] flex-col rounded-3xl bg-white p-4 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl sm:min-h-[650px] sm:p-6 dark:bg-slate-700">


      <div className="flex flex-1 flex-col items-center">


        {/* Progress Circle */}
        <div
          className="relative h-32 w-32 flex-shrink-0 cursor-pointer sm:h-40 sm:w-40"
          title="Click to mark today's progress"
          onClick={() => onUpdate(goal._id)}
        >

          <svg
            className="-rotate-90"
            width="100%"
            height="100%"
            viewBox="0 0 160 160"
          >

            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#E5E7EB"
              strokeWidth="10"
              fill="none"
            />


            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke={
                percentage === 100
                  ? "#16A34A"
                  : "#2563EB"
              }
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{
                transition: "stroke-dashoffset 0.6s ease",
              }}
            />

          </svg>



          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl dark:text-slate-100">
              {percentage}%
            </h2>


            <p className="text-xs text-gray-500 dark:text-slate-300">
              Tap to Update
            </p>

          </div>


        </div>




        {/* Goal Details */}
        <div className="mt-5 flex min-h-[90px] w-full flex-col items-center text-center sm:mt-6 sm:min-h-[100px]">


          <h2 className="break-words text-lg font-bold text-gray-800 sm:text-xl dark:text-slate-100">
            {goal.title}
          </h2>



          {goal.description && (

            <p className="mt-2 line-clamp-3 w-full break-words text-sm text-gray-500 dark:text-slate-300">
              {goal.description}
            </p>

          )}


        </div>





        {/* Stats */}
        <div className="mt-5 grid w-full grid-cols-2 gap-2 sm:mt-6 sm:gap-3">


          <div className="rounded-xl bg-blue-50 p-3 text-center sm:p-4 dark:bg-slate-600">

            <p className="text-xs text-gray-500 sm:text-sm dark:text-slate-300">
              Completed
            </p>


            <p className="text-xl font-bold text-blue-600 sm:text-2xl">
              {goal.completedDays}
            </p>

          </div>




          <div className="rounded-xl bg-orange-50 p-3 text-center sm:p-4 dark:bg-slate-600">

            <p className="text-xs text-gray-500 sm:text-sm dark:text-slate-300">
              Remaining
            </p>


            <p className="text-xl font-bold text-orange-600 sm:text-2xl">
              {remainingDays}
            </p>

          </div>


        </div>






        {/* Bottom Section */}
        <div className="mt-auto flex w-full flex-col items-center">



          {/* Duration */}
          <div className="mt-4 text-center text-sm text-gray-600 dark:text-slate-300">

            Duration:{" "}

            <span className="font-semibold text-gray-800 dark:text-white">
              {goal.duration} days
            </span>

          </div>





          {/* Status */}
          <div className="mt-4">

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                goal.status === "Completed"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : goal.status === "In Progress"
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              }`}
            >
              {goal.status}
            </span>

          </div>






          {/* Button */}
          <button
            onClick={() => onUpdate(goal._id)}
            disabled={goal.status === "Completed"}
            className={`mt-5 w-full rounded-xl py-3 text-sm font-semibold transition sm:text-base ${
              goal.status === "Completed"
                ? "cursor-not-allowed bg-green-600 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >

            {goal.status === "Completed"
              ? "Goal Completed 🎉"
              : "Mark Today Complete"}

          </button>



        </div>


      </div>


    </div>
  );
};

export default GoalProgressCard;