
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../features/coursesStore/courseSlice";
import RequestCourseModal from "../components/RequestCourseModal";
import FeedbackModal from "../components/FeedbackModal";


export default function RequestCourse() {
    const dispatch = useDispatch();
    const [latestFeedback, setLatestFeedback] = useState({});
    const [selectedCourse, setSelectedCourse] = useState(null);


    const courses = useSelector(
        (state) => state.courses.list
    );

    const loggedInUser = JSON.parse(
        localStorage.getItem("currentUser")
    );


    useEffect(() => {

        dispatch(fetchCourses());

    }, [dispatch]);





    const getLatestFeedback = async (courseId) => {

        try {


            const response = await fetch(
                `http://localhost:5000/api/feedback/latest/${courseId}`
            );


            const data = await response.json();



            setLatestFeedback(prev => ({
                ...prev,
                [courseId]: data
            }));

            console.log(
                "Updated feedback state:",
                {
                    courseId,
                    data
                }
            );


        }
        catch (error) {

            console.log(
                "Feedback fetch error:",
                error
            );

        }

    };

    const refreshFeedback = async (courseId) => {

        console.log(
            "Refreshing feedback for course:",
            courseId
        );

        await getLatestFeedback(courseId);

    };



    useEffect(() => {


        if (courses.length > 0) {


            courses.forEach(course => {

                getLatestFeedback(course._id);

            });


        }


    }, [courses]);







    return (

        <div className="min-h-screen bg-gray-100 p-6">


            <div className="max-w-5xl mx-auto">


                <h2 className="
                    text-3xl
                    font-bold
                    mb-6
                ">
                    Courses
                </h2>





                {
                    courses.length === 0 ? (


                        <p className="text-gray-500">
                            No Courses Available
                        </p>


                    ) : (



                        <div className="space-y-4">



                            {
                                courses.map((course) => (



                                    <div

                                        key={course._id}

                                        className="
                        bg-white
                        rounded-lg
                        shadow-md
                        p-5
                        flex
                        justify-between
                        items-start
                        text-left
                        ">



                                        {/* COURSE DETAILS */}


                                        <div className="flex-1">



                                            <h3 className="
                                    text-xl
                                    font-semibold
                                    text-blue-600
                                ">

                                                {course.title}

                                            </h3>





                                            <p className="
                                    text-gray-600
                                    mt-2
                                ">

                                                {course.description}

                                            </p>





                                            <p className="
                                    mt-3
                                    font-semibold
                                ">

                                                Price: ₹{course.price}

                                            </p>





                                            <p className="
                                    text-sm
                                    text-gray-500
                                    mt-1
                                ">

                                                Created By:
                                                {" "}
                                                {course.createdBy}

                                            </p>




                                        </div>







                                        {/* BUTTON SECTION */}



                                        {
                                            (
                                                loggedInUser?.role === "learner" ||
                                                loggedInUser?.role === "faculty"

                                            ) && (



                                                <div className="
                                ml-6
                                flex
                                flex-col
                                items-start
                                gap-2
                            ">



                                                    <div className="
                                    flex
                                    gap-3
                                ">



                                                        <button

                                                            onClick={() =>
                                                                setSelectedCourse(course)
                                                            }


                                                            className="
                                    bg-blue-600
                                    hover:bg-blue-700
                                    text-white
                                    text-sm
                                    px-2
                                    py-1
                                    rounded-md
                                    "
                                                        >

                                                            Request Course

                                                        </button>



                                                    </div>







                                                    {/* LATEST FEEDBACK */}


                                                  





                                                </div>


                                            )
                                        }




                                    </div>


                                ))

                            }



                        </div>



                    )
                }

   {/* COURSE REQUEST MODAL */}


                {
                    selectedCourse && (

                        <RequestCourseModal

                            course={selectedCourse}

                            onClose={() =>
                                setSelectedCourse(null)
                            }

                        />

                    )
                }



            
            </div>


        </div>

    );

}