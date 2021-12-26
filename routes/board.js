const express = require('express')
const router = express.Router()
const multer = require('multer')
const checkAuth = require('../middleware/check_auth')
const boardCtrl = require('../dbos/boardController')
const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './uploads')
    },
    filename : function(req, file, cb){
        cb(null, file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null, true)
    }
    else{
        cb(null, false)
    }
}
const upload = multer({
    storage : storage,
    limit : {
       filesize : 1024*1024*5 
    },
    fileFilter : fileFilter
})
// get boards
router.get('/', checkAuth, boardCtrl.getAll)
// get board
router.get('/:boardId', checkAuth, boardCtrl.get)
// save board
router.post('/', checkAuth, upload.single("boardImage"), boardCtrl.save)
// update board
router.post('/update/:boardId', checkAuth, boardCtrl.update)
// delete boards
router.post('/delete', checkAuth, boardCtrl.deleteAll)
// delete board
router.post('/delete/:boardId', checkAuth, boardCtrl.delete)
module.exports = router