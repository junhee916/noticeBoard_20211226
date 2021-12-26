const commendModel = require('../models/commend')
const commendController = {}
commendController.get = async (req, res) => {
    const id = req.params.commendId
    try{
        if(res.locals.user){
            const commend = await commendModel.findById(id)
                            .populate('user', ['email'])
                            .populate('board', ['board'])
            if(!commend){
                return res.status(403).json({
                    msg : "no commendId"
                })
            }
            else{
                res.status(200).json({
                    msg : "get commend",
                    commendInfo : {
                        id : commend["_id"],
                        user : commend["user"],
                        board : commend["board"],
                        commend : commend["commend"]
                    }
                })
            }
        }
        else{
            res.status(402).json({
                msg : "no token"
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};
commendController.save = async (req, res) => {
    const {user, board, commend} = req.body
    const newComend = new commendModel({
        user, board, commend
    })
    try{
        if(res.locals.user){
            const commend = await newComend.save()
            res.status(200).json({
                msg : "save commend",
                commendInfo : {
                    id : commend["_id"],
                    user : commend["user"],
                    board : commend["board"],
                    commend : commend["commend"]
                }
            })
        }
        else{
            res.status(403).json({
                msg : "no token"
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};
commendController.update = async (req, res) => {
    const id = req.params.commendId
    try{
        if(res.locals.user){
            const commend = await commendModel.findByIdAndUpdate(id, {$set : {
                            user : req.body.user,
                            board : req.body.board,
                            commend : req.body.commend
                        }})
            if(!commend){
                return res.status(403).json({
                    msg : "no commendId"
                })
            }
            else{
                res.status(200).json({
                    msg : "update commend by id: " + id
                })
            }
        }
        else{
            res.status(402).json({
                msg : "no token"
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};
commendController.delete = async (req, res) => {
    const id = req.params.commendId
    try{
        if(res.locals.user){
            const commend = await commendModel.findByIdAndRemove(id)
            if(!commend){
                return res.status(403).json({
                    msg : "no commendId"
                })
            }
            else{
                res.status(200).json({
                    msg : "delete commend by id: " + id
                })
            }
        }
        else{
            res.status(402).json({
                msg : "no token"
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};
module.exports = commendController