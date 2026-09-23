const express = require("express");

const router = express.Router();


const {
    createCourseRequest,
    getCourseRequests,
    getLearnerRequests,
    updateCourseRequestStatus

} = require("../controllers/courseRequestController");

// ==================================
// CREATE COURSE REQUEST (LEARNER)
// POST /api/course-requests
// ==================================

router.post(
    "/",
    createCourseRequest
);


// ==================================
// GET ALL COURSE REQUESTS (ADMIN)
// GET /api/course-requests
// ==================================

router.get(
    "/",
    getCourseRequests
);



// ==================================
// GET LEARNER COURSE REQUEST STATUS
// GET /api/course-requests/learner/:learnerId
// ==================================

router.get(
    "/learner/:learnerId",
    getLearnerRequests
);



// ==================================
// UPDATE REQUEST STATUS (ADMIN)
// PUT /api/course-requests/:id
// ==================================

router.put(
    "/:id",
    updateCourseRequestStatus
);



module.exports = router;
