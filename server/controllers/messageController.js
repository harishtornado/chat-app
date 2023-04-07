import { response } from 'express'
import Messages from '../models/messageModel.js'

export const addMsg = async (req, res, next) => {
    try{
        const { from , to , message } = req.body
        const data = await Messages.create({
            message : { text : message },
            users : [ from, to],
            sender : from
        })
        if(data){
            return response.json({msg : "Message added successfully"})
        }
        return response.json({msg : "failed to add message"})
    }
    catch(err){
        next(err)
    }

}

export const getAllMsg = async (req, res, next) => {
    try{
        const { from , to } = req.body
        const data = await Messages.find({
            users : { $all :[ from, to], },
        }).sort({updatedAt : 1})
        const projectedMessages = data.map(message => {
            return {
                fromSelf : message.sender.toString() === from,
                message : message.message.text,
            }
        })
        res.json(projectedMessages)
    }
    catch(err){
        next(err)
    }
}