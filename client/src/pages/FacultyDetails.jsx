import { useNavigate } from "react-router-dom";

function FacultyDetails() {

  const navigate = useNavigate();

    const user = JSON.parse(
        localStorage?.getItem("currentUser")
    );

  const logout = () => {

    sessionStorage.removeItem("user");

    navigate("/");

  };

  return (

    <div className="text-left p-10 mt-20">

      <h1 className="text-5xl font-bold">

        Welcome to Faculty page

      </h1>

    
                {/* USER DETAILS */}

                <div className="
                    bg-white
                    rounded-lg
                    shadow
                    p-6
                    mb-6
                ">


                    <h2 className="
                        text-xl
                        font-bold
                        mb-4
                    ">
                        User Details
                    </h2>


                    <p className="mb-2">
                        <b>Name:</b>{" "}
                        {user?.name}
                    </p>


                    <p className="mb-2">
                        <b>Email:</b>{" "}
                        {user?.email}
                    </p>


                    <p>
                        <b>Role:</b>{" "}
                        {user?.role}
                    </p>


                </div>

    </div>

  );

}

export default FacultyDetails;