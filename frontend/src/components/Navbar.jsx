import { useEffect, useState } from "react";
import {
  FaSignOutAlt,
  FaUserCircle,
  FaMoon,
  FaSun,
  FaUser,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { avatars } from "../data/avatars";


const Navbar = () => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();


  const [loading, setLoading] = useState(false);



  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );



  const [selectedAvatar, setSelectedAvatar] = useState(
    localStorage.getItem("avatar") || null
  );



  useEffect(() => {

    const updateAvatar = () => {

      setSelectedAvatar(
        localStorage.getItem("avatar")
      );

    };


    window.addEventListener(
      "storage",
      updateAvatar
    );


    return () => {

      window.removeEventListener(
        "storage",
        updateAvatar
      );

    };

  }, []);





  const currentAvatar =
    avatars.find(
      (avatar) =>
        avatar.id === selectedAvatar
    );



  const AvatarIcon =
    currentAvatar?.icon;






  const toggleDarkMode = () => {

    const newMode = !darkMode;

    setDarkMode(newMode);


    if (newMode) {

      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );

    } else {

      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );

    }

  };







  const handleLogout = async () => {

    if (loading) return;


    setLoading(true);


    try {

      await logout();

      navigate("/", {
        replace: true,
      });


    } finally {

      setLoading(false);

    }

  };







  return (

    <header className="fixed top-0 left-0 right-0 z-50 flex h-[73px] items-center justify-between border-b bg-white px-3 shadow-sm sm:px-8 dark:border-slate-700 dark:bg-slate-900">





      {/* Logo */}

      <h1 className="text-xl font-bold sm:text-3xl">

        <span className="rounded-md bg-amber-500 px-2 py-1 text-black">
          Pro
        </span>


        <span className="ml-1 rounded-md bg-blue-600 px-2 py-1 text-white">
          gressHub
        </span>


      </h1>








      <div className="flex items-center gap-2 sm:gap-5">






        {/* Dark Mode */}

        <button

          onClick={toggleDarkMode}

          className="flex h-9 w-9 items-center justify-center rounded-full 
          bg-slate-200 text-slate-700 transition hover:bg-slate-300
          sm:h-10 sm:w-10
          dark:bg-slate-700 dark:text-yellow-400"

        >

          {
            darkMode
              ? <FaSun />
              : <FaMoon />
          }


        </button>








        {/* User */}

        <div className="flex items-center gap-2 sm:gap-3">



          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500 text-black sm:h-10 sm:w-10">


            {
              AvatarIcon ? (

                <AvatarIcon size={22} />

              ) : user?.username ? (

                user.username
                  .charAt(0)
                  .toUpperCase()

              ) : (

                <FaUserCircle />

              )
            }



          </div>







          <div className="hidden sm:block">


            <p className="font-semibold text-slate-800 dark:text-white">

              {user?.username || "Guest"}

            </p>



            <p className="text-sm text-slate-500 dark:text-slate-400">

              {user?.email}

            </p>



          </div>


        </div>








        {/* Profile Button */}

        <button

          onClick={() => navigate("/profile")}

          className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700 sm:px-4 sm:text-base"

        >

          <FaUser />


          <span className="hidden sm:inline">
            Profile
          </span>


        </button>









        {/* Logout */}

        <button

          onClick={handleLogout}

          disabled={loading}

          className="flex items-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4 sm:text-base"

        >


          <FaSignOutAlt />


          <span className="hidden sm:inline">

            {
              loading
              ? "Logging out..."
              : "Logout"
            }

          </span>


        </button>





      </div>



    </header>

  );

};


export default Navbar;