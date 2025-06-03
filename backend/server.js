import dotenv from "dotenv";
import express from "express";
import cors from "cors";    
import mongoose from "mongoose";
import multer from "multer";
import xlsx from "xlsx";

dotenv.config();

// Middleware to handle CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || "+",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
})
);

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

const app = express();
const PORT = process.env.PORT || 5000;  