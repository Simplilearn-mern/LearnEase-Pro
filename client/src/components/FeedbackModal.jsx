import { useState } from "react";


export default function FeedbackModal({
    course,
    onClose,
    refreshFeedback
}) {


    const user = JSON.parse(
        localStorage.getItem("currentUser")
    );


    const [message, setMessage] = useState("");

    const [rating, setRating] = useState(5);

    const [loading, setLoading] = useState(false);




    const submitFeedback = async () => {


        if (!message.trim()) {
            alert("Please enter feedback");
            return;
        }


        const user =
            JSON.parse(localStorage.getItem("currentUser"));


        console.log("Current User:", user);


        const learnerId =
            user?._id || user?.id;


        console.log(
            "Sending learnerId:",
            learnerId
        );



        if (!learnerId) {

            alert(
                "Learner ID missing. Please login again."
            );

            return;

        }



        try {


            const response = await fetch(
                "http://localhost:5000/api/feedback",
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },


                    body: JSON.stringify({

                        courseId: course._id,

                        learnerId: learnerId,

                        learnerName: user.name,

                        message: message,

                        rating: Number(rating)

                    })

                }
            );



            const data = await response.json();


if (response.ok) {

    alert(
        "Feedback submitted successfully"
    );


    if(refreshFeedback){

        await refreshFeedback(course._id);

    }


setTimeout(() => {
    onClose();
}, 300);

}
            else {

                console.log(
                    "API Error:",
                    data
                );

                alert(
                    data.message
                );

            }


        }
        catch (error) {

            console.log(
                "Submit feedback error:",
                error
            );

        }


    };



    return (


        <div
            className="
            fixed
            inset-0
            bg-black/50
            flex
            items-center
            justify-center
            z-50
            "
        >


            <div
                className="
                bg-white
                rounded-lg
                shadow-xl
                p-6
                w-96
                "
            >



                <h2
                    className="
                    text-xl
                    font-bold
                    mb-4
                    "
                >

                    Feedback for {course.title}

                </h2>





                <label
                    className="
                    block
                    font-semibold
                    mb-2
                    "
                >

                    Rating

                </label>




                <select

                    value={rating}

                    onChange={(e) =>
                        setRating(e.target.value)
                    }


                    className="
                    border
                    rounded
                    p-2
                    w-full
                    mb-4
                    "

                >

                    <option value="5">
                        ⭐⭐⭐⭐⭐
                    </option>

                    <option value="4">
                        ⭐⭐⭐⭐
                    </option>

                    <option value="3">
                        ⭐⭐⭐
                    </option>

                    <option value="2">
                        ⭐⭐
                    </option>

                    <option value="1">
                        ⭐
                    </option>


                </select>







                <textarea

                    className="
border
w-full
p-2
mb-3
"

                    placeholder="Write feedback (max 100 characters)"

                    maxLength={100}

                    value={message}

                    onChange={(e) => {

                        if (e.target.value.length <= 100) {
                            setMessage(e.target.value);
                        }

                    }}

                />


                <p className="text-sm text-gray-500">
                    {message.length}/100 characters
                </p>




                <div
                    className="
                    flex
                    justify-end
                    gap-3
                    "
                >



                    <button

                        onClick={onClose}


                        className="
                        bg-gray-400
                        hover:bg-gray-500
                        text-white
                        px-4
                        py-2
                        rounded
                        "

                    >

                        Cancel

                    </button>





                    <button

                        onClick={submitFeedback}

                        disabled={loading}


                        className="
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        px-4
                        py-2
                        rounded
                        "

                    >

                        {
                            loading
                                ?
                                "Submitting..."
                                :
                                "Submit"
                        }


                    </button>



                </div>



            </div>


        </div>


    );


}