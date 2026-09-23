const express = require("express");
const Course = require("../models/Course");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * CREATE course (Protected)
 */


router.post("/", async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();

    // ✅ MUST RETURN COURSE OBJECT
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET all courses (Public)
 */
router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

/**
 * UPDATE course (Protected)
 */
router.put("/:id", async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(updatedCourse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * DELETE course (Protected)
 */
router.delete("/:id", async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;