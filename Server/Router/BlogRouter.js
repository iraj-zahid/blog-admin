const express = require("express")
const router = express.Router()
const multer = require("multer")
const {PostBlog, GetBlog, DltBlog, UpdateBlog} = require("../Controllers/BlogController")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
router.post('/createblog', upload.single('image'),PostBlog)
router.post('/updateblog', upload.single('image'),UpdateBlog)
router.route("/getblog").get(GetBlog)
// router.route("/updateblog").post(UpdateBlog)
router.route('/dltblog').post(DltBlog)
module.exports = router