import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import encryptPassword from "../middlewares/encryptPassword";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, username } = req.body;
    const hash = await encryptPassword.encryptPassword(password)
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name,
        email,
        password: hash,
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

const login = async (req: Request, res: Response, next: NextFunction) => {
    console.log('login')
    const { username, password } = req.body;
    if (username && password) {
        const user = await User.find({ username })
            .then((user) => {
                return user
            })
            .catch((error) => {
                return error
            })
        if (!!user.length && password) {
            const isValidPassword = await encryptPassword.comparePassword(password, user[0].password);
            if (isValidPassword) res.status(200).json({ user })
            else res.status(400).json({ message: 'wrong password' })
        } else {
            res.status(404).json({ message: 'Username not present' })
        }
    } else {
        res.status(400).json({ message: 'Missing username and password' })
    }
    // next()
}


export default { createUser, validateUsername, login }