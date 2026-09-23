const CourseRequest = require("../models/CourseRequest");

// =======================================
// CREATE COURSE REQUEST
// POST /api/course-requests
// =======================================

exports.createCourseRequest = async (req, res) => {

    try {

        const {
            learnerId,
            courseId,
            message
        } = req.body;


        if (!learnerId || !courseId) {

            return res.status(400).json({

                success: false,
                message: "Learner and course are required"

            });

        }

        // Check existing pending request

        const existingRequest =
            await CourseRequest.findOne({

                learnerId,
                courseId,
                status: "Pending"

            });


        if (existingRequest) {

            return res.status(400).json({

                success: false,
                message: "Request already submitted"

            });

        }

        const request =
            await CourseRequest.create({

                learnerId,
                courseId,
                message,
                status: "Pending"

            });


        res.status(201).json({

            success: true,
            message: "Course request submitted",
            data: request

        });



    } catch (error) {


        res.status(500).json({

            success: false,
            message: error.message

        });


    }

};



// =======================================
// GET ALL COURSE REQUESTS (ADMIN)
// GET /api/course-requests
// =======================================

exports.getCourseRequests = async (req, res) => {

    try {

        const requests =
            await CourseRequest
                .find()
                .populate(
                    "learnerId",
                    "name email"
                )
                .populate(
                    "courseId",
                    "title description price"
                )
                .sort({
                    createdAt: -1
                });


        res.status(200).json({

            success: true,
            data: requests

        });



    } catch (error) {


        res.status(500).json({

            success: false,
            message: error.message

        });


    }

};


// =======================================
// GET LEARNER COURSE REQUESTS
// GET /api/course-requests/learner/:learnerId
// =======================================

exports.getLearnerRequests = async (req, res) => {

    try {
        const requests =
            await CourseRequest
                .find({

                    learnerId: req.params.learnerId

                })
                .populate(
                    "courseId",
                    "title description price"
                )
                .sort({

                    createdAt: -1

                });

        res.status(200).json({

            success: true,
            data: requests

        });

    } catch (error) {


        res.status(500).json({

            success: false,
            message: error.message

        });


    }

};

// =======================================
// UPDATE COURSE REQUEST STATUS
// PUT /api/course-requests/:id
// =======================================

exports.updateCourseRequestStatus = async (req, res) => {

    try {


        const {
            status
        } = req.body;




        if (
            !["Approved", "Rejected"]
                .includes(status)
        ) {


            return res.status(400).json({

                success: false,
                message: "Invalid status"

            });


        }


        const request =
            await CourseRequest
                .findByIdAndUpdate(

                    req.params.id,

                    {
                        status
                    },

                    {
                        new: true
                    }

                )
                .populate(
                    "learnerId",
                    "name email"
                )
                .populate(
                    "courseId",
                    "title description price"
                );


        if (!request) {


            return res.status(404).json({

                success: false,
                message: "Course request not found"

            });


        }

        res.status(200).json({

            success: true,

            message:
                `Request ${status}`,

            data: request

        });

    } catch (error) {


        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};
