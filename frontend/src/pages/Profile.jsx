import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { useOutletContext } from "react-router-dom";


const Profile = () => {

  const {
    user,
    goals,
  } = useOutletContext();



  const activityValues = user?.activity?.map((item) => ({
    date: item.date,
    count: 1,
  })) || [];



  return (
    <div className="min-h-screen bg-slate-100 p-4 dark:bg-slate-950">


      <div className="mx-auto max-w-5xl space-y-8">



        {/* Profile Card */}
        <div className="rounded-3xl bg-white p-8 shadow-lg dark:bg-slate-900">


          <div className="flex flex-col items-center">


            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-amber-500 text-4xl font-bold text-black">

              {user?.username
                ?.charAt(0)
                .toUpperCase()}

            </div>



            <h1 className="mt-5 text-3xl font-bold text-slate-800 dark:text-white">
              {user?.username}
            </h1>


            <p className="text-slate-500 dark:text-slate-400">
              {user?.email}
            </p>


          </div>


        </div>





        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">


          <div className="rounded-2xl bg-white p-6 text-center shadow-md dark:bg-slate-900">

            <p className="text-slate-500 dark:text-slate-400">
              Total Goals
            </p>


            <h2 className="mt-2 text-4xl font-bold text-blue-600">
              {goals.length}
            </h2>

          </div>




          <div className="rounded-2xl bg-white p-6 text-center shadow-md dark:bg-slate-900">

            <p className="text-slate-500 dark:text-slate-400">
              Current Streak 🔥
            </p>


            <h2 className="mt-2 text-4xl font-bold text-orange-500">
              {user?.streak || 0}
            </h2>

          </div>




          <div className="rounded-2xl bg-white p-6 text-center shadow-md dark:bg-slate-900">

            <p className="text-slate-500 dark:text-slate-400">
              Best Streak 🏆
            </p>


            <h2 className="mt-2 text-4xl font-bold text-green-600">
              {user?.bestStreak || 0}
            </h2>

          </div>


        </div>





        {/* Activity Heatmap */}
        <div className="rounded-3xl bg-white p-8 shadow-lg dark:bg-slate-900">


          <h2 className="mb-6 text-2xl font-bold text-slate-800 dark:text-white">
            Activity Tracker
          </h2>



          <CalendarHeatmap

            startDate={
              new Date(
                new Date().setFullYear(
                  new Date().getFullYear() - 1
                )
              )
            }

            endDate={new Date()}

            values={activityValues}

            classForValue={(value) => {

              if (!value) {
                return "color-empty";
              }

              return "color-github";
            }}

          />


        </div>



      </div>


    </div>
  );
};


export default Profile;