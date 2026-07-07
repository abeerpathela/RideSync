const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/register', registerUser);
router.post('/login', loginUser);
router.route('/profile').get(protect, getUserProfile).put(protect, upload.single('profilePicture'), updateUserProfile);
router.route('/').get(protect, authorize('admin'), getAllUsers);
router.route('/:id').delete(protect, authorize('admin'), deleteUser);

module.exports = router;
