import bcrypt from "bcryptjs";
import User from "../../models/userModel.js";
import sendMail from "../../utils/emailSender.js";
import registerSchema from "../../utils/authValidation.js";

// Register
export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Validate request body against schema
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Simple email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const verificationCodeExpires = Date.now() + 30 * 60 * 1000; // 30 minutes

    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
      verificationCode,
      verificationCodeExpires,
    });

    try {
      const mailObj = {
        mailFrom: `"E-commerce App" <${process.env.EMAIL_USER}>`,
        mailTo: email,
        subject: "Verify Your Email",
        body: `Welcome ${userName}. Your account has been successfully created. Proceed to verify your email. Your verification code is: ${verificationCode}`,
      };
      await sendMail(mailObj);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Failed to send verification email" });
    }

    res.status(201).json({
      message:
        "Registered successfully. Check your email for verification code.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
