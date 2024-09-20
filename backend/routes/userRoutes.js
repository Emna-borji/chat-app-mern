const { registerUser, loginUser, allUsers } = require("../controllers/userController");
const auth = require("../middleware/auth");
const router = require("express").Router();
const multer = require('multer');

// Setup multer for handling file uploads
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

router.route("/")
    .post(upload.single('pic'), registerUser)  // Use upload.single('pic') here
    .get(auth, allUsers);

router.post("/login", loginUser);

module.exports = router;