import express from "express"
import { signup, login , setAvatar,getAllUsers } from "../controllers/usersController.js"

export const userRoutes = express.Router()

userRoutes.post("/signup",signup)
userRoutes.post("/login",login)
userRoutes.put("/setAvatar/:id",setAvatar)
userRoutes.get("/allusers/:id",getAllUsers)
