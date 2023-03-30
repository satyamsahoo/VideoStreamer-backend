import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";

const createUser = (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, username } = req.body;
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name,
        email,
        password,
        username
    })
    return user.
        save().
        then((user) => {
            res.status(201).json({ user })
        }).
        catch((error) => {
            res.status(500).json({ error })
        })
}

const validateUsername = (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;
    return User.find({ username: username })
        .then((user) => {
            !!user.length ? res.status(400).json({ message: 'username present' }) : res.status(200).json({ message: 'username not found' })
        })
        .catch((error) => {
            res.status(500).json({ error })
        })
}

export default { createUser, validateUsername }