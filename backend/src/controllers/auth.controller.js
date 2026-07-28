const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};


// REGISTER USER
async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const isUserExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserExist) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });


    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );


    res.cookie(
      "token",
      token,
      cookieOptions
    );


    console.log("Register cookie set");


    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });


  } catch (error) {

    console.error("Register Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });

  }
}




// LOGIN USER
async function loginUser(req, res) {

  try {

    const { username, password } = req.body;


    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }


    const user = await userModel.findOne({
      username,
    });



    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }



    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );



    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }



    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );



    res.cookie(
      "token",
      token,
      cookieOptions
    );


    console.log("Login cookie set:", token.substring(0, 20) + "...");



    return res.status(200).json({

      message: "User logged in successfully",

      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },

    });



  } catch (error) {

    console.error("Login Error:", error);


    return res.status(500).json({
      message: "Internal Server Error",
    });

  }

}





// GET CURRENT USER
async function getCurrentUser(req, res) {

  try {

    const user = await userModel
      .findById(req.user._id)
      .select("-password");


    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }


    return res.status(200).json(user);



  } catch(error) {


    console.error(
      "Get Current User Error:",
      error
    );


    return res.status(500).json({
      message: "Internal Server Error",
    });


  }

}





// LOGOUT USER
async function logoutUser(req, res) {

  try {

    res.clearCookie(
      "token",
      {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      }
    );


    return res.status(200).json({
      message: "Logged out successfully",
    });



  } catch(error) {


    console.error(
      "Logout Error:",
      error
    );


    return res.status(500).json({
      message: "Internal Server Error",
    });

  }

}



module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
};