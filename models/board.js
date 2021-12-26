const mongoose = require('mongoose')
const modelSchema = mongoose.Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user',
            required : true
        },
        board : {
            type : String,
            required: true
        },
        boardImage : {
            type : String
        }
    },
    {
        timestamps : true
    }
)
module.exports = mongoose.model('board', modelSchema)