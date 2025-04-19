const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  // console.log(req.body);

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });
    }

    const token=jwt.sign({
        id: checkUser._id,
        role: checkUser.role,
        email:checkUser.email ,
        userName: checkUser.userName
    }, 'CLIENT_SECRET_KEY',{expiresIn:'60m'})

    res.cookie('token',token,{httpOnly:true,secure:false}).json({
        success:true,
        message: "User logged in successfully",
        token: token,
        user:{
            id: checkUser._id,
            role: checkUser.role,
            email: checkUser.email,
            userName: checkUser.userName
        }
    })

  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

//logout
const logoutUser = (req, res) => {
    res.clearCookie("token").json({
      success: true,
      message: "Logged out successfully!",
    });
  };

  //auth middleware
const authMiddleware = async (req, res, next) => {
    // Check for token in cookies
    let token = req.cookies.token;
    
    // If not in cookies, check Authorization header
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7); // Remove 'Bearer ' prefix
      }
    }
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorised user!",
      });
    }
  
    try {
      const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
      req.user = decoded;
      
      next();
    } catch (error) {
      console.error("Auth error:", error.message);
      res.status(401).json({
        success: false,
        message: "Unauthorised user!",
      });
    }
  };

module.exports = { registerUser,loginUser ,logoutUser,authMiddleware};
