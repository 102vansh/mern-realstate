const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middleware/auth')
const { createlisting, getlisting, deletelisting, updatelisting, mylisting, getalllisting } = require('../controllers/list.controller')
router.route('/create').post(isAuthenticated,createlisting)
router.route('/mylisting').get(isAuthenticated,mylisting)
router.route('/deletelist/:id').delete(isAuthenticated,deletelisting)
router.route('/update/:id').post(isAuthenticated,updatelisting)
router.route('/get/:id').get(getlisting)
router.route('/get').get(getalllisting)
module.exports = router