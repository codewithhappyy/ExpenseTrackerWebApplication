import jwt from "jsonwebtoken";
import User from "../models/User.js";

//Generate JWT token
const generateToken = (id) => { 
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

export const registerUser = async (req, res) => {
    const { name, email, password, profileImageUrl } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try{
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({ name, email, password, profileImageUrl });
        res.status(201).json({ message: "User created successfully", id: user._id, user, token: generateToken(user._id) });
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
    
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try{
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful", id: user._id, user, token: generateToken(user._id) });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
}

export const getUserInfo = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
