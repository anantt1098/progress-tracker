import { useState } from "react";

import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "../styles/heatmap.css";

import { useOutletContext, useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

import { avatars } from "../data/avatars";



const Profile = () => {


  const navigate = useNavigate();

  const { logout } = useAuth();



  const {
    user,
    goals,
  } = useOutletContext();




  const [loggingOut, setLoggingOut] = useState(false);



  const [selectedAvatar, setSelectedAvatar] = useState(
    localStorage.getItem("avatar") || "developer"
  );




  const currentAvatar =
    avatars.find(
      (avatar) => avatar.id === selectedAvatar
    ) || avatars[0];



  const AvatarIcon = currentAvatar.icon;







  const handleLogout = async () => {


    if (loggingOut) return;


    setLoggingOut(true);


    try {

      await logout();

      navigate("/", {
        replace:true,
      });


    } finally {

      setLoggingOut(false);

    }


  };






  const completedGoals = goals.filter(
    (goal) => goal.status === "Completed"
  ).length;






  const achievements = [

    {
      title: "First Step",
      icon: "🌱",
      unlocked: completedGoals >= 1,
    },

    {
      title: "Week Warrior",
      icon: "🔥",
      unlocked: user?.streak >= 7,
    },

    {
      title: "Month Master",
      icon: "🏆",
      unlocked: user?.streak >= 30,
    },

    {
      title: "Goal Crusher",
      icon: "🎯",
      unlocked: completedGoals >= 10,
    },

    {
      title: "Consistency King",
      icon: "⭐",
      unlocked: user?.streak >= 60,
    },

  ];





  const unlockedBadges = achievements.filter(
    (badge) => badge.unlocked
  );





  const activityValues =
    user?.activity?.map((item) => ({
      date:item.date,
      count:1,
    })) || [];






  const handleAvatarChange = (id) => {


    setSelectedAvatar(id);


    localStorage.setItem(
      "avatar",
      id
    );


  };






  return (

    <div className="min-h-screen bg-slate-100 p-4 dark:bg-slate-950">


      <div className="mx-auto max-w-5xl space-y-8">






        {/* Back Button */}

        <button

          onClick={() => navigate("/dashboard")}

          className="
          flex
          items-center
          gap-2
          rounded-lg
          bg-blue-600
          px-4
          py-2
          font-medium
          text-white
          transition
          hover:bg-blue-700
          "

        >

          <FaArrowLeft />

          Back to Dashboard

        </button>









        {/* Profile Card */}

        <div className="rounded-3xl bg-white p-8 shadow-lg dark:bg-slate-900">


          <div className="flex flex-col items-center">






            {/* Avatar */}

            <div className="
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-full
            bg-amber-500
            text-black
            ">

              <AvatarIcon size={45}/>

            </div>








            <h1 className="
            mt-5
            text-3xl
            font-bold
            text-slate-800
            dark:text-white
            ">

              {user?.username}

            </h1>





            <p className="
            text-slate-500
            dark:text-slate-400
            ">

              {user?.email}

            </p>







            {/* Logout Button */}

            <button

              onClick={handleLogout}

              disabled={loggingOut}

              className="
              mt-5
              flex
              items-center
              gap-2
              rounded-lg
              bg-red-500
              px-5
              py-2
              font-medium
              text-white
              transition
              hover:bg-red-600
              disabled:cursor-not-allowed
              disabled:opacity-60
              "

            >

              <FaSignOutAlt />

              {
                loggingOut
                ?
                "Logging out..."
                :
                "Logout"
              }


            </button>

            {/* Avatar Selector */}

            <div className="mt-8 w-full">


              <h2 className="
              mb-4
              text-center
              text-lg
              font-bold
              text-slate-800
              dark:text-white
              ">

                Choose Profile Icon

              </h2>





              <div className="grid grid-cols-4 gap-4 sm:grid-cols-9">


                {
                  avatars.map((avatar) => {


                    const Icon = avatar.icon;



                    return (

                      <button

                        key={avatar.id}

                        onClick={() =>
                          handleAvatarChange(
                            avatar.id
                          )
                        }


                        title={avatar.name}


                        className={`
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-full
                        transition

                        ${
                          selectedAvatar === avatar.id

                          ?

                          "bg-blue-600 text-white ring-4 ring-blue-300"

                          :

                          "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"

                        }
                        `}

                      >

                        <Icon size={25}/>

                      </button>

                    );


                  })
                }


              </div>


            </div>




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









        {/* Achievements */}


        <div className="rounded-3xl bg-white p-8 shadow-lg dark:bg-slate-900">



          <h2 className="
          mb-6
          text-2xl
          font-bold
          text-slate-800
          dark:text-white
          ">

            🏆 Achievements

          </h2>







          {
            unlockedBadges.length === 0

            ?

            (

              <p className="text-slate-500 dark:text-slate-400">

                Complete goals and maintain streaks to unlock badges.

              </p>

            )

            :

            (

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">



                {
                  unlockedBadges.map((badge)=>(


                    <div

                      key={badge.title}

                      className="
                      rounded-2xl
                      bg-green-50
                      p-5
                      text-center
                      dark:bg-green-900/20
                      "

                    >


                      <div className="text-4xl">

                        {badge.icon}

                      </div>



                      <h3 className="
                      mt-3
                      font-bold
                      text-slate-800
                      dark:text-white
                      ">

                        {badge.title}

                      </h3>



                      <span className="
                      mt-3
                      inline-block
                      rounded-full
                      bg-green-600
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-white
                      ">

                        Unlocked ✓

                      </span>



                    </div>


                  ))
                }


              </div>


            )

          }



        </div>









        {/* Activity Tracker */}


        <div className="rounded-3xl bg-white p-8 shadow-lg dark:bg-slate-900">


          <h2 className="
          mb-6
          text-2xl
          font-bold
          text-slate-800
          dark:text-white
          ">

            Activity Tracker

          </h2>





          <div className="heatmap-container">


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



              classForValue={(value)=>{


                if(!value){

                  return "color-empty";

                }


                return "color-github";


              }}



            />


          </div>



        </div>





      </div>



    </div>


  );


};



export default Profile;