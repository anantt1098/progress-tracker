import { useMemo, useState } from "react";

import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlus,
  FaTimes,
} from "react-icons/fa";



const Sidebar = ({
  goals = [],
  loading = false,
  onAddGoal,
  onEditGoal,
  onDeleteGoal,
  isOpen,
  setIsOpen,
}) => {


  const [search, setSearch] = useState("");





  const filteredGoals = useMemo(() => {

    return goals.filter((goal) =>
      goal.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [goals, search]);







  const getStatusColor = (status) => {

    switch(status){

      case "Completed":

        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";


      case "In Progress":

        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";


      default:

        return "bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-300";

    }

  };







  const handleAddGoal = () => {

    onAddGoal();

    setIsOpen(false);

  };







  return (

    <>


      {/* Overlay */}

      {
        isOpen && (

          <div

            onClick={() => setIsOpen(false)}

            className="
            fixed
            inset-0
            z-40
            bg-black/50
            lg:block
            "

          />

        )
      }







      <aside

        className={`

        fixed

        left-0

        top-[73px]

        z-50

        flex

        h-[calc(100vh-73px)]

        w-80

        flex-col

        border-r

        bg-white

        p-5

        shadow-xl

        transition-transform

        duration-300


        dark:border-slate-700

        dark:bg-slate-900



        ${

          isOpen

          ?

          "translate-x-0"

          :

          "-translate-x-full"

        }


        `}

      >







        {/* Close Button */}

        <button

          onClick={() => setIsOpen(false)}

          className="
          mb-4
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          bg-red-500
          text-white
          transition
          hover:bg-red-600
          "

        >

          <FaTimes />

        </button>









        {/* Add Goal */}

        <button

          onClick={handleAddGoal}

          className="
          mb-5
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-amber-500
          py-3
          font-semibold
          text-black
          transition
          hover:bg-amber-600
          "

        >

          <FaPlus />

          Add Goal


        </button>









        {/* Search */}

        <div className="relative mb-5">


          <FaSearch

            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
            "

          />



          <input

            type="text"

            placeholder="Search goals..."

            value={search}

            onChange={(e)=>
              setSearch(e.target.value)
            }


            className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            py-3
            pl-11
            pr-4
            text-slate-800

            focus:border-blue-500
            focus:outline-none

            dark:border-slate-700
            dark:bg-slate-800
            dark:text-white
            "

          />


        </div>









        <h2

          className="
          mb-4
          text-lg
          font-bold
          text-slate-700
          dark:text-slate-200
          "

        >

          My Goals

        </h2>









        <div

          className="
          flex-1
          space-y-3
          overflow-y-auto
          pr-1
          "

        >




          {
            loading ?


            (

              <p className="text-center text-slate-500">

                Loading goals...

              </p>

            )


            :


            filteredGoals.length === 0 ?


            (

              <div className="
              rounded-xl
              bg-slate-100
              p-5
              text-center
              dark:bg-slate-800
              ">


                <p className="text-sm text-slate-600 dark:text-slate-300">

                  🎯 No goals yet

                </p>


                <p className="mt-2 text-xs text-slate-400">

                  Click + Add Goal to create your first goal.

                </p>


              </div>

            )


            :


            filteredGoals.map((goal)=>(


              <div

                key={goal._id}

                className="
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                p-4
                shadow-sm
                transition
                hover:shadow-md

                dark:border-slate-700
                dark:bg-slate-800
                "

              >




                <div className="flex items-start justify-between gap-3">


                  <h3 className="
                  truncate
                  font-semibold
                  text-slate-800
                  dark:text-white
                  ">

                    {goal.title}

                  </h3>





                  <div className="flex gap-3">


                    <button

                      onClick={() => onEditGoal(goal)}

                      className="text-blue-500 hover:text-blue-700"

                    >

                      <FaEdit size={14}/>

                    </button>





                    <button

                      onClick={() => onDeleteGoal(goal._id)}

                      className="text-red-500 hover:text-red-700"

                    >

                      <FaTrash size={14}/>

                    </button>


                  </div>


                </div>








                {
                  goal.description && (

                    <p className="
                    mt-2
                    line-clamp-2
                    text-sm
                    text-slate-500
                    dark:text-slate-400
                    ">

                      {goal.description}

                    </p>

                  )
                }







                <div className="
                mt-4
                flex
                items-center
                justify-between
                ">



                  <span

                    className={`

                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-medium

                    ${getStatusColor(goal.status)}

                    `}

                  >

                    {goal.status}

                  </span>





                  <span className="text-sm text-slate-500">

                    {goal.duration}d

                  </span>


                </div>





              </div>


            ))

          }




        </div>





      </aside>


    </>

  );

};


export default Sidebar;