const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

/*
========================================
Register API
POST /api/auth/register
========================================
*/

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Success response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/*
========================================
Login API
POST /api/auth/login
========================================
*/

router.post("/login", async (req, res) => {

  try {

    const { email, password, role } = req.body;


    const user = await User.findOne({ email });


    if(!user){

      return res.status(404).json({

        message:"User not registered"

      });

    }



    // Check selected role

    if(user.role !== role){

      return res.status(401).json({

        message:"Invalid role selected"

      });

    }



    const isMatch = await bcrypt.compare(
      password,
      user.password
    );



    if(!isMatch){

      return res.status(401).json({

        message:"Invalid password"

      });

    }



    res.status(200).json({

      message:"Login successful",

      user:{
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role
      }

    });


  }
  catch(error){

    res.status(500).json({

      message:error.message

    });

  }

});

module.exports = router;