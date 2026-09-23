import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourses,
  addCourse,
  deleteCourse,
  updateCourse
} from "../features/coursesStore/courseSlice";

import computerImage from "../assets/computer.png";
import "../components/navbar.css";

export default function AddCourses() {

  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.list);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editId, setEditId] = useState(null);


  // Logged user
  const loggedInUser = JSON.parse(
    localStorage.getItem("currentUser")
  );


  const isAdmin = loggedInUser?.role === "admin";
  const isFaculty = loggedInUser?.role === "faculty";


  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);



  // ADD / UPDATE
 const handleSubmit = async () => {

  if (!title || !description) return;


  const courseData = {
    title,
    description
  };


  if (editId) {

    await dispatch(
      updateCourse({
        id: editId,
        data: courseData
      })
    );

  } 
  else if (isAdmin) {

    await dispatch(
      addCourse(courseData)
    );

  }


  setEditId(null);
  setTitle("");
  setDescription("");

};



  // DELETE (Admin only)
  const handleDelete = (id) => {

    if (isAdmin) {
      dispatch(deleteCourse(id));
    }

  };



  // EDIT
  const handleEdit = (course) => {

    setEditId(course._id);
    setTitle(course.title);
    setDescription(course.description);

  };

  return (

    <div className="min-h-screen bg-gray-100 p-6">


      <h4 className="text-3xl font-bold">
        Welcome to home page, {loggedInUser?.name}
      </h4>


<div className="grid grid-cols-10 gap-6 bg-white">

      {/* COURSE FORM */}
      
 <div className="col-span-4 bg-white p-4 rounded shadow mt-6 mb-6">
      {(isAdmin || isFaculty) && (

        <div className="bg-white p-4  mt-6 mb-6">


          <h2 className="text-xl font-semibold mb-2">

            {editId
              ? "Update Course Details"
              : "Add Course Details"}

          </h2>



          <input

            className="border p-2 w-full mb-2"

            placeholder="Course Title"

            value={title}

            onChange={(e) =>
              setTitle(e.target.value)
            }

          />



          <textarea

            className="border p-2 w-full mb-2"

            placeholder="Description"

            value={description}

            onChange={(e) =>
              setDescription(e.target.value)
            }

          />





          {/* ADMIN ADD + UPDATE */}

          {isAdmin && (

            <button

              onClick={handleSubmit}

              className={`text-white px-4 py-2 rounded ${
                editId
                ? "bg-green-600"
                : "bg-blue-600"
              }`}

            >

              {editId
                ? "Update Course Details"
                : "Add Course Details"}

            </button>

          )}






          {/* FACULTY UPDATE ONLY */}

          {isFaculty && editId && (

            <button

              onClick={handleSubmit}

              className="bg-green-600 text-white px-4 py-2 rounded"

            >

              Update Course Details

            </button>

          )}






          {editId && (

            <button

              onClick={() => {

                setEditId(null);
                setTitle("");
                setDescription("");

              }}

              className="ml-2 bg-gray-400 text-white px-3 py-2 rounded"

            >

              Cancel

            </button>

          )}



        </div>

      )}

</div>
 <div className="col-span-6 bg-white flex justify-between items-center">
      {/* IMAGE */}

      <div className="bg-white px-6 flex justify-between items-center">

        <div

          className="h-20 w-20 bg-contain bg-no-repeat bg-center computerImage"

          style={{
            backgroundImage:
              `url(${computerImage})`
          }}

        />

      </div>
</div>

</div>  




      {/* COURSE LIST */}

      <div className="bg-white p-4 rounded shadow mt-6">


        <h2 className="text-xl font-semibold mb-4">
          Courses
        </h2>



        {courses.length === 0 ? (

          <p className="text-gray-500">
            No courses found
          </p>

        ) : (


          courses.map((course) => (


            <div

              key={course._id}

              className="flex justify-between items-center border-b py-2"

            >


              <div>


                <h3 className="font-bold">
                  {course.title}
                </h3>


                <p className="text-sm text-gray-600">
                  {course.description}
                </p>


                <p className="mt-3 font-semibold">
                  Price: ₹{course.price}
                </p>


              </div>





              <div className="space-x-2">


                {/* ADMIN + FACULTY EDIT */}

                {(isAdmin || isFaculty) && (

                  <button

                    onClick={() =>
                      handleEdit(course)
                    }

                    className="bg-yellow-500 text-white px-3 py-1 rounded"

                  >

                    Edit

                  </button>

                )}






                {/* ADMIN DELETE ONLY */}

                {isAdmin && (

                  <button

                    onClick={() =>
                      handleDelete(course._id)
                    }

                    className="bg-red-500 text-white px-3 py-1 rounded"

                  >

                    Delete

                  </button>

                )}



              </div>



            </div>


          ))

        )}



      </div>



    </div>

  );

}