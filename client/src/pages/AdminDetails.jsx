
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDetails() {
    const [requests, setRequests] = useState([]);

    const [selectedRequest, setSelectedRequest] = useState(null);



    // ============================
    // GET ALL COURSE REQUESTS
    // ============================

    const fetchRequests = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/api/course-requests"
            );


            setRequests(
                response.data?.data || []
            );


        } catch (error) {

            console.log(
                "Fetch request error:",
                error
            );

        }

    };


    useEffect(() => {

        fetchRequests();

    }, []);

    // ============================
    // UPDATE STATUS
    // ============================

    const updateStatus = async (status) => {

        try {


            await axios.put(

                `http://localhost:5000/api/course-requests/${selectedRequest._id}`,

                {
                    status
                }

            );



            // Refresh list after update

            await fetchRequests();


            // Close popup

            setSelectedRequest(null);



        } catch (error) {


            console.log(
                "Update status error:",
                error
            );


        }

    };







    return (

        <div className="
            min-h-screen
            p-6
        ">


            <div className="
                max-w-6xl
                mx-auto
            ">



                <h1 className="
                    text-3xl
                    font-bold
                    mb-6
                ">
                    Admin Dashboard
                </h1>





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
                        Course Requests
                    </h2>





                    {
                        requests.length === 0 ?


                            (

                                <p className="
                                text-gray-500
                            ">
                                    No course requests found
                                </p>

                            )


                            :


                            (

                                <div className="
                                space-y-4
                            ">


                                    {
                                        requests.map(
                                            (request) => (


                                                <div

                                                    key={
                                                        request._id
                                                    }

                                                    className="
                                            border
                                            rounded-lg
                                            p-5
                                            flex
                                            justify-between
                                            items-center
                                        "

                                                >




                                                    <div>


                                                        <h3 className="
                                                text-xl
                                                font-semibold
                                                text-blue-600
                                            ">

                                                            {
                                                                request
                                                                    .courseId
                                                                    ?.title
                                                            }

                                                        </h3>





                                                        <p className="mt-2">

                                                            <b>
                                                                Learner:
                                                            </b>{" "}

                                                            {
                                                                request
                                                                    .learnerId
                                                                    ?.name
                                                            }

                                                        </p>





                                                        <p>

                                                            <b>
                                                                Email:
                                                            </b>{" "}

                                                            {
                                                                request
                                                                    .learnerId
                                                                    ?.email
                                                            }

                                                        </p>





                                                        <p>

                                                            <b>
                                                                Message:
                                                            </b>{" "}

                                                            {
                                                                request.message
                                                            }

                                                        </p>





                                                        <p className="mt-2">

                                                            <b>
                                                                Status:
                                                            </b>{" "}

                                                            {
                                                                request.status
                                                            }

                                                        </p>



                                                    </div>







                                                    <div className="
                                            flex
                                            flex-col
                                            items-end
                                            gap-3
                                        ">


                                                        {
                                                            request.status === "Pending" &&


                                                            <button

                                                                onClick={() =>
                                                                    setSelectedRequest(request)
                                                                }

                                                                className="
                                                        bg-blue-600
                                                        hover:bg-blue-700
                                                        text-white
                                                        px-5
                                                        py-2
                                                        rounded-lg
                                                    "

                                                            >

                                                                Submitted Request

                                                            </button>

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

                                                                Approved

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

                                                                Rejected

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









            {/* APPROVAL POPUP */}


            {
                selectedRequest &&


                <div className="
                    fixed
                    inset-0
                    bg-black/50
                    flex
                    items-center
                    justify-center
                ">



                    <div className="
                        bg-white
                        rounded-lg
                        p-6
                        w-96
                    ">



                        <h2 className="
                            text-xl
                            font-bold
                            mb-4
                        ">
                            Course Request Review
                        </h2>





                        <p>

                            <b>
                                Learner:
                            </b>{" "}

                            {
                                selectedRequest
                                    .learnerId
                                    ?.name
                            }

                        </p>





                        <p className="mt-2">

                            <b>
                                Course:
                            </b>{" "}

                            {
                                selectedRequest
                                    .courseId
                                    ?.title
                            }

                        </p>





                        <p className="mt-2">

                            <b>
                                Message:
                            </b>{" "}

                            {
                                selectedRequest.message
                            }

                        </p>





                        <div className="
                            flex
                            justify-end
                            gap-3
                            mt-6
                        ">



                            <button

                                onClick={() =>
                                    updateStatus("Rejected")
                                }

                                className="
                                    bg-red-600
                                    text-white
                                    px-4
                                    py-2
                                    rounded-lg
                                "

                            >

                                Reject

                            </button>





                            <button

                                onClick={() =>
                                    updateStatus("Approved")
                                }

                                className="
                                    bg-green-600
                                    text-white
                                    px-4
                                    py-2
                                    rounded-lg
                                "

                            >

                                Approve

                            </button>





                            <button

                                onClick={() =>
                                    setSelectedRequest(null)
                                }

                                className="
                                    bg-gray-400
                                    text-white
                                    px-4
                                    py-2
                                    rounded-lg
                                "

                            >

                                Cancel

                            </button>



                        </div>




                    </div>


                </div>

            }



        </div>

    );




}

