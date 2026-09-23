import { useState } from "react";
import axios from "axios";


export default function RequestCourseModal({ course, onClose }) {

    const [message, setMessage] = useState("");

    const user = JSON.parse(
        localStorage.getItem("currentUser")
    );

    const submitRequest = async () => {

        try {
            if (!user?.id) {

                alert(
                    "User not logged in"
                );

                return;

            }

            if (!message.trim()) {

                alert(
                    "Please enter request message"
                );

                return;

            }



            const payload = {

                learnerId: user.id,

                courseId: course._id,

                message: message

            };



            console.log(
                "Submitting Course Request:",
                payload
            );





            const response = await axios.post(

                "http://localhost:5000/api/course-requests",

                payload

            );





            console.log(
                "Request Response:",
                response.data
            );





            if (response.data.success) {


                alert(
                    response.data.message
                );


                setMessage("");


                onClose();


            }



        } catch(error) {


            console.log(
                "Request Error:",
                error.response?.data ||
                error.message
            );



            alert(

                error.response?.data?.message ||
                "Failed to submit request"

            );


        }


    };


    return (

        <div className="
            fixed
            inset-0
            bg-black/50
            flex
            justify-center
            items-center
        ">


            <div className="
                bg-white
                w-96
                p-6
                rounded-lg
            ">



                <h2 className="
                    text-xl
                    font-bold
                    mb-4
                ">
                    Request Course
                </h2>





                <p className="
                    font-semibold
                ">
                    {course?.title}
                </p>





                <textarea

                    className="
                        border
                        w-full
                        mt-4
                        p-2
                        rounded
                    "

                    rows={4}

                    placeholder="
                        Why do you want this course?
                    "

                    value={message}

                    onChange={(e)=>
                        setMessage(e.target.value)
                    }

                />







                <div className="
                    flex
                    justify-end
                    gap-3
                    mt-5
                ">



                    <button

                        onClick={onClose}

                        className="
                            bg-gray-400
                            text-white
                            px-4
                            py-2
                            rounded
                        "

                    >

                        Cancel

                    </button>







                    <button

                        onClick={submitRequest}

                        className="
                            bg-green-600
                            text-white
                            px-4
                            py-2
                            rounded
                        "

                    >

                        Submit

                    </button>



                </div>




            </div>



        </div>

    );

}