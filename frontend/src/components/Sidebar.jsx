import { useMemo, useState } from "react";

import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
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

  const [collapsed, setCollapsed] = useState(false);




  const filteredGoals = useMemo(() => {

    return goals.filter((goal) =>
      goal.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [goals, search]);







  const getStatusColor = (status) => {

    switch (status) {

      case "Completed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";


      case "In Progress":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";


      default:
        return "bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-300";

    }

  };








  return (

    <>


      {/* Mobile Overlay */}

      {
        isOpen && (

          <div

            onClick={() => setIsOpen(false)}

            className="
            fixed
            inset-0
            z-40
            bg-black/50
            lg:hidden
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
        flex-col
        border-r
        bg-white
        p-4
        shadow-xl
        transition-all
        duration-300

        dark:border-slate-700
        dark:bg-slate-900


        lg:sticky
        lg:top-[73px]
        lg:z-auto
        lg:shadow-none


        ${

          isOpen

          ? "translate-x-0"

          : "-translate-x-full lg:translate-x-0"

        }


        ${
          collapsed
          ? "lg:w-20"
          : "lg:w-96"
        }


        w-80

        `}

      >








        {/* Collapse Button */}

        <button

          onClick={() =>
            setCollapsed(!collapsed)
          }

          className="
          absolute
          -right-3
          top-5
          hidden
          h-7
          w-7
          items-center
          justify-center
          rounded-full
          bg-blue-600
          text-white
          lg:flex
          "

        >

          {
            collapsed
            ?
            <FaChevronRight size={12}/>
            :
            <FaChevronLeft size={12}/>
          }


        </button>







        {/* Mobile Close */}

        <button

          onClick={() => setIsOpen(false)}

          className="
          mb-4
          flex
          items-center
          justify-center
          rounded-lg
          bg-red-500
          p-2
          text-white
          lg:hidden
          "

        >

          <FaTimes />

        </button>










        {/* Add Goal */}

        <button

          onClick={onAddGoal}

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

          {
            !collapsed && (
              <span>
                Add Goal
              </span>
            )
          }


        </button>









        {/* Search */}

        {
          !collapsed && (

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

                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
                "

              />


            </div>

          )
        }









        {
          !collapsed && (

            <h2

              className="
              mb-3
              text-lg
              font-semibold
              text-slate-700
              dark:text-slate-200
              "

            >

              My Goals

            </h2>

          )
        }









        {/* Goals */}

        <div

          className="
          flex-1
          space-y-2
          overflow-y-auto
          "

        >



          {
            loading ? (

              <p className="text-center text-slate-500">
                Loading...
              </p>

            )

            :

            filteredGoals.length === 0 ? (

              <p className="text-center text-slate-500">
                No goals
              </p>

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
                p-3

                dark:border-slate-700
                dark:bg-slate-800
                "

              >



                <div className="flex justify-between">


                  <h3

                    className="
                    truncate
                    font-semibold
                    text-slate-800
                    dark:text-white
                    "

                  >

                    {
                      !collapsed
                      &&
                      goal.title
                    }


                    {
                      collapsed
                      &&
                      "🎯"
                    }


                  </h3>




                  {
                    !collapsed && (

                      <div className="flex gap-3">


                        <button

                          onClick={() =>
                            onEditGoal(goal)
                          }

                          className="text-blue-500"

                        >

                          <FaEdit size={14}/>

                        </button>



                        <button

                          onClick={() =>
                            onDeleteGoal(goal._id)
                          }

                          className="text-red-500"

                        >

                          <FaTrash size={14}/>

                        </button>


                      </div>

                    )
                  }


                </div>





                {
                  !collapsed && (

                    <>


                      {
                        goal.description && (

                          <p className="
                          mt-1
                          truncate
                          text-sm
                          text-slate-500
                          dark:text-slate-400
                          ">

                            {goal.description}

                          </p>

                        )
                      }




                      <div className="
                      mt-3
                      flex
                      justify-between
                      ">


                        <span

                          className={`
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          ${getStatusColor(goal.status)}
                          `}

                        >

                          {goal.status}

                        </span>


                        <span className="text-sm text-slate-500">

                          {goal.duration}d

                        </span>


                      </div>


                    </>

                  )
                }




              </div>


            ))
          }



        </div>






      </aside>


    </>

  );

};


export default Sidebar;