import express from "express"
import { getAllMsg, addMsg } from "../controllers/messageController.js"

export const messageRoutes = express.Router()

messageRoutes.post("/addMsg",addMsg)
messageRoutes.post("/getMsg",getAllMsg)

