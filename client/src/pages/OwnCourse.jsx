import { useEffect, useState } from "react";
import axios from "axios";


export default function OwnCourseForStudent() {

    const user = JSON.parse(
        localStorage.getItem("currentUser")
    );


    const [requests, setRequests] = useState([]);

    const [loading, setLoading] = useState(true);



    const fetchRequests = async () => {

        try {

            if (!user?.id) {

                console.log("User ID not found");

                setLoading(false);

                return;

            }



            let response;



            // ADMIN GET ALL REQUESTS
            if (user.role?.toLowerCase() === "admin") {


                response = await axios.get(
                    "http://localhost:5000/api/course-requests"
                );


            } 


            // LEARNER GET OWN REQUESTS
            else {


                response = await axios.get(
                    `http://localhost:5000/api/course-requests/learner/${user.id}`
                );


            }




            console.log(
                "Course Request Response:",
                response.data
            );



            const courseRequests =
                response.data?.data || [];



            console.log(
                "Requests:",
                courseRequests.map(item => ({

                    course:
                    item.courseId?.title,

                    status:
                    item.status

                }))
            );



            setRequests(courseRequests);



        } catch(error) {


            console.log(
                "Fetch request error:",
                error.response?.data ||
                error.message
            );


        } finally {


            setLoading(false);


        }

    };






    useEffect(() => {


        fetchRequests();



        const interval = setInterval(() => {

            fetchRequests();

        },5000);



        return () => {

            clearInterval(interval);

        };


    }, [user?.id]);







    return (



<>


        <div className="
            min-h-screen
            bg-gray-100
            p-6
        ">


            <div className="
                max-w-5xl
                mx-auto
            ">


                <h1 className="
                    text-3xl
                    font-bold
                    mb-6
                ">

                    {
                        user?.role?.toLowerCase() === "admin"
                        ? "Admin Dashboard"
                        : "Learner Dashboard"
                    }

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







                {/* COURSE REQUESTS */}

                <div className="
                    bg-white
                    rounded-lg
                    shadow
                    p-6
                ">


                    <h2 className="
                        text-xl
                        font-bold
                        mb-5
                    ">

                        {
                            user?.role?.toLowerCase() === "admin"
                            ? "All Course Requests"
                            : "My Course Requests"
                        }

                    </h2>





                    {
                        loading ?

                        (
                            <p className="text-gray-500">
                                Loading requests...
                            </p>
                        )


                        :


                        requests.length === 0 ?

                        (
                            <p className="text-gray-500">
                                No course request submitted
                            </p>
                        )


                        :


                        (

                            <div className="space-y-4">


                                {
                                    requests.map(
                                        (request)=>(


                                        <div
                                            key={request._id}
                                            className="
                                                border
                                                rounded-lg
                                                p-5
                                            "
                                        >



                                            <h3 className="
                                                text-xl
                                                font-semibold
                                                text-blue-600
                                            ">

                                                {
                                                    request.courseId?.title
                                                }

                                            </h3>





                                            <p className="mt-2">

                                                <b>
                                                    Description:
                                                </b>{" "}

                                                {
                                                    request.courseId?.description
                                                }

                                            </p>





                                            <p className="mt-2">

                                                <b>
                                                    Price:
                                                </b>{" "}

                                                ₹
                                                {
                                                    request.courseId?.price
                                                }

                                            </p>





                                            <p className="mt-2">

                                                <b>
                                                    Message:
                                                </b>{" "}

                                                {
                                                    request.message
                                                }

                                            </p>





                                            {/* ADMIN CAN SEE LEARNER DETAILS */}

                                            {
                                                user?.role?.toLowerCase() === "admin" &&

                                                <p className="mt-2">

                                                    <b>
                                                        Learner:
                                                    </b>{" "}

                                                    {
                                                        request.learnerId?.name ||
                                                        request.userId?.name ||
                                                        "N/A"
                                                    }

                                                </p>

                                            }






                                            <p className="mt-3">

                                                <b>
                                                    Status:
                                                </b>{" "}

                                                {
                                                    request.status
                                                }

                                            </p>






                                            <div className="mt-4">


                                                {
                                                    request.status === "Pending" &&

                                                    <span className="
                                                        bg-yellow-100
                                                        text-yellow-700
                                                        px-4
                                                        py-2
                                                        rounded-lg
                                                        font-semibold
                                                    ">
                                                        Request Submitted
                                                    </span>

                                                }





                                                {
                                                    request.status === "Approved" &&

                                                    <span className="
                                                        bg-green-100
                                                        text-green-700
                                                        px-4
                                                        py-2
                                                        rounded-lg
                                                        font-semibold
                                                    ">
                                                        Course Access Approved
                                                    </span>

                                                }





                                                {
                                                    request.status === "Rejected" &&

                                                    <span className="
                                                        bg-red-100
                                                        text-red-700
                                                        px-4
                                                        py-2
                                                        rounded-lg
                                                        font-semibold
                                                    ">
                                                        Course Request Rejected
                                                    </span>

                                                }



                                            </div>





                                        </div>


                                    ))

                                }



                            </div>

                        )

                    }



                </div>



            </div>


        </div>
</>
    );

}