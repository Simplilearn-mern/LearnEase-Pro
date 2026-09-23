import React from "react";

export default function MyDetails() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const userDetails = Object.entries(currentUser || {});

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">

            <div className="w-full bg-white rounded-xl shadow-lg p-6">

                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                    My Details
                </h2>

                <div className="space-y-4">

                    {userDetails.map(([key, value]) => (
                        <div
                            key={key}
                            className="grid grid-cols-[20%_80%] items-center
  rounded-lg px-4 py-3
  border border-gray-200
  hover:bg-blue-50 transition duration-300"
                        >
                            <span className="font-semibold text-gray-700 capitalize text-left">
                                {key}
                            </span>

                            <span className="text-gray-600 break-all text-left">
                                {value}
                            </span>

                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
}