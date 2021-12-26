const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check_auth')
const userCtrl = require('../dbos/userController')
// get users
router.get('/', checkAuth, userCtrl.getAll)
// get user
router.get('/:userId', checkAuth, userCtrl.get)
// signup
router.post('/signup', userCtrl.signup) 
// login
router.post('/login', userCtrl.login)
// update user
router.post("/update/:userId", checkAuth, userCtrl.update)
// delete users
router.post('/delete', checkAuth, userCtrl.deleteAll)
// detlet user
router.post('/detailDelete/:userId', checkAuth, userCtrl.delete)
module.exports = router