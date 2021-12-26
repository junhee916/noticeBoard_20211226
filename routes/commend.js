const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check_auth')
const commendCtrl = require('../dbos/commendController')
// get commend
router.get('/:commendId', checkAuth, commendCtrl.get)
// save commend
router.post('/', checkAuth, commendCtrl.save)
// update commend
router.post('/update/:commendId', checkAuth, commendCtrl.update)
// delete commend
router.post('/delete/:commendId', checkAuth, commendCtrl.delete)
module.exports = router