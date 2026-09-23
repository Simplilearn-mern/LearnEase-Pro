const express = require("express");
const Feedback = require("../models/Feedback");

const router = express.Router();


// CREATE FEEDBACK
router.post("/", async (req, res) => {

    try {

        const feedback = await Feedback.create(req.body);

        res.status(201).json({
            success: true,
            feedback
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


// GET FEEDBACK BY COURSE
router.get("/:courseId", async (req, res) => {

    try {

        const feedback = await Feedback.find({
            courseId: req.params.courseId
        });

        res.json(feedback);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// GET LATEST FEEDBACK FOR COURSE
router.get("/latest/:courseId", async (req, res) => {

    try {

        const feedback = await Feedback.findOne({
            courseId: req.params.courseId
        })
            .sort({
                createdAt: -1
            });


        res.json(feedback);


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;