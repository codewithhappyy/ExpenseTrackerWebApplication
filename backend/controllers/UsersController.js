import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import User from '../models/user.Model.js'

dotenv.config();

export const getUsers = async (req, res) =>{
    try {
    const users = await User.find({}); 
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getUserByUserId = async (req, res) =>{
    try{
        let user = User.findOne( { userid: req.body.userid })

    } catch(err){
        res.status(500).json({ error: err.message })
    }
}

export const createUser = async (req, res) => {
    try{
        let emailExistQuery = await User.findOne({ email: req.body.email })
        console.log(emailExistQuery);

        if(emailExistQuery){
            res.status(200).send({ success: false, msg: "User already exist."})
        }else{
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            ...req.body,
            password: hashPassword
        })
        await user.save();
        res.json(user);
    }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}




