var express = require('express');
var router = express.Router();
let userController=require ('../userControllers/form')
var multer= require('multer');
var path=require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })




/* GET users listing. */

router.get('/register',userController.register);
router.post('/register',upload.any(),userController.store);


router.get('/login',userController.login);
router.post('/auth',userController.auth)

router.get('/profile',userController.profile)
module.exports = router;
