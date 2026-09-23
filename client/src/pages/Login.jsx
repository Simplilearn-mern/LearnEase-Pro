import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "learner",
  });

  const [error, setError] = useState("");


  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };


  const login = async (e) => {

    e.preventDefault();

    setError("");

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      // Save user details
      localStorage.setItem("currentUser", JSON.stringify(res.data.user));
      sessionStorage.setItem(
        "currentUser",
        JSON.stringify(res.data.user)
      );


      // Role based redirect
      const role = res.data.user.role;


      if(role === "admin"){

        navigate("/adminHome/addCourses");

      }
      else if(role === "faculty"){

        navigate("/adminHome/facultyDetails");

      }
      else{

        navigate("/adminHome/ownCourse");

      }


    } catch(err){


      if(err.response.status === 404){

        alert("User not registered");

        navigate("/register");

      }
      else{

        setError(
          err.response.data.message
        );

      }

    }

  };


  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">


      <form
        onSubmit={login}
        className="bg-white p-8 rounded shadow w-96"
      >


        <h2 className="text-3xl font-bold text-center mb-5">
          Login
        </h2>


        {
          error &&

          <p className="text-red-500 mb-3">
            {error}
          </p>
        }



        <input

          type="email"

          name="email"

          placeholder="Email"

          className="border w-full p-2 mb-4"

          value={form.email}

          onChange={handleChange}

        />



        <input

          type="password"

          name="password"

          placeholder="Password"

          className="border w-full p-2 mb-4"

          value={form.password}

          onChange={handleChange}

        />



        {/* Role Radio buttons */}

    <div className="mb-4">
  <label className="block mb-2 font-medium">Role</label>

  <div className="flex items-center gap-6">
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name="role"
        value="admin"
        checked={form.role === "admin"}
        onChange={handleChange}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
      />
      <span>Admin</span>
    </label>

    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name="role"
        value="faculty"
        checked={form.role === "faculty"}
        onChange={handleChange}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
      />
      <span>Faculty</span>
    </label>

    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name="role"
        value="learner"
        checked={form.role === "learner"}
        onChange={handleChange}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
      />
      <span>Learner</span>
    </label>
  </div>
</div>

        <button

          className="bg-blue-600 text-white w-full py-2 rounded"

        >

          Login

        </button>



        <p className="mt-4 text-center">

          Don't have an account?

          <Link

            to="/register"

            className="text-blue-600 ml-2"

          >

            SignUp

          </Link>

        </p>


      </form>


    </div>

  );

}


export default Login;