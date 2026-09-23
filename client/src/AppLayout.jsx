import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/AdminHome";
import FacultyDetails from "./pages/FacultyDetails";
import StudentsDetails from "./pages/StudentsDetails";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import LoginHeader from "./components/LoginHeader";
import AddCourses from "./pages/AddCourse";
import CourseDetails from "./pages/CourseDetails";
import AdminHome from "./pages/AdminHome";
import MyDetails from "./pages/MyDetails";
import RequestCourse from "./pages/RequestCourse";
import AdminDetails from "./pages/AdminDetails";
import OwnCourseForStudent  from "./pages/OwnCourse";


function AppLayout() {
  const location = useLocation();

  const authRoutes = ["/login", "/register"];
  const isAuthPage = authRoutes.includes(location.pathname);

  return (
    <>
      {isAuthPage ? <LoginHeader /> : <Navbar />}

     <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/courses" element={<Courses />} />
  <Route path="/adminHome" element={<AdminHome />}>

    <Route path="facultyDetails" element={<FacultyDetails />} />
    <Route path="studentsDetails" element={<StudentsDetails />} />
    <Route path="courseDetails" element={<CourseDetails />} />
    <Route path="addCourses" element={<AddCourses />} />
    <Route path="myDetails" element={<MyDetails />} />
    <Route path="requestCourse" element={<RequestCourse />} />
      <Route path="adminDetails" element={<AdminDetails />} />
    {/* <Route path="viewCourse" element={<ViewCourse />} /> */}
    <Route path="ownCourse" element={<OwnCourseForStudent />} />
  </Route>
</Routes>
    </>
  );
}
export default AppLayout;