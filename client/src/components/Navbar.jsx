import logoImage from "../assets/logo.png";
import searchImage from "../assets/searchImage.jpg";
import "./navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  // Dynamic Active Link CSS
  const navLinkClass = ({ isActive }) =>
    `
    relative transition-all duration-300
    after:absolute after:left-0 after:-bottom-1
    after:h-[2px] after:bg-blue-600
    after:transition-all after:duration-300

    ${
      isActive
        ? "text-blue-600 font-semibold after:w-full"
        : "text-black hover:text-blue-500 after:w-0 hover:after:w-full"
    }
    `;

  return (
    <nav className="bg-white text-black px-6 py-4 flex justify-between items-center">

      {/* LOGO */}
      <div
        className="logoImage"
        style={{ backgroundImage: `url(${logoImage})` }}
      />


      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">

        <div className="flex items-center gap-5">

          {/* PUBLIC LINKS */}
          {!loggedInUser && (
            <>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>

              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>

              <NavLink to="/courses" className={navLinkClass}>
                Courses
              </NavLink>

              <NavLink to="/news" className={navLinkClass}>
                News
              </NavLink>

              <NavLink to="/contactUs" className={navLinkClass}>
                Contact Us
              </NavLink>
            </>
          )}


          {/* ADMIN LINKS */}
          {loggedInUser?.role === "admin" && (
            <>
              <NavLink
                to="/adminHome/facultyDetails"
                className={navLinkClass}
              >
                Faculty Details
              </NavLink>

              <NavLink
                to="/adminHome/studentsDetails"
                className={navLinkClass}
              >
                Students Details
              </NavLink>
            </>
          )}

    {/* ADMIN LINKS */}
          {loggedInUser?.role === "faculty" && (
            <>
              <NavLink
                to="/adminHome/facultyDetails"
                className={navLinkClass}
              >
                Faculty Details
              </NavLink>

            </>
          )}

          {/* ADMIN + FACULTY */}
          {(loggedInUser?.role === "admin" ||
            loggedInUser?.role === "faculty") && (
            <NavLink
              to="/adminHome/addCourses"
              className={navLinkClass}
            >
              Add Course
            </NavLink>
          )}


          {/* ADMIN + FACULTY + LEARNER */}
          {(loggedInUser?.role === "admin" ||
            loggedInUser?.role === "faculty" ||
            loggedInUser?.role === "learner") && (
            <NavLink
              to="/adminHome/courseDetails"
              className={navLinkClass}
            >
              Course Details
            </NavLink>
          )}


          {/* LEARNER LINKS */}
          {loggedInUser?.role === "learner" && (
            <>
              <NavLink
                to="/adminHome/requestCourse"
                className={navLinkClass}
              >
                Request Course
              </NavLink>

              <NavLink
                to="/adminHome/viewCourse"
                className={navLinkClass}
              >
                View Course
              </NavLink>

              <NavLink
                to="/adminHome/ownCourse"
                className={navLinkClass}
              >
                Own Course
              </NavLink>
            </>
          )}


          {/* LOGGED IN USER */}
          {loggedInUser && (
            <>
              <NavLink
                to="/adminHome/myDetails"
                className={navLinkClass}
              >
                My Details
              </NavLink>


              <button
                onClick={handleLogout}
                className="text-black hover:text-red-600 transition duration-300"
              >
                Logout
              </button>
            </>
          )}

        </div>


        {/* SEARCH */}
        <div
          className={`flex items-center bg-black rounded-md overflow-hidden transition-all duration-300 h-10
          ${showSearch ? "w-56" : "w-10"}
          `}
        >

          {showSearch && (
            <input
              type="text"
              placeholder="Search..."
              className="h-10 w-full px-2 text-black outline-none"
              autoFocus
            />
          )}


          <button
            onClick={() => setShowSearch(!showSearch)}
            className="h-10 w-10 flex items-center justify-center"
          >
            <div
              className="h-5 w-5 bg-contain bg-no-repeat bg-center"
              style={{
                backgroundImage: `url(${searchImage})`
              }}
            />
          </button>

        </div>

      </div>

    </nav>
  );
}