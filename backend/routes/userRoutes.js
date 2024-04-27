const express = require('express');
const {
  signup,
  updateDetails,
  filterUsers,
  signin,
  getUser,
} = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();
router.get('/hello', (req, res) => {
  console.log('hello world');
  res.json({ msg: 'hello world' });
});
router.get('/getUser', authMiddleware, getUser);
router.post('/signup', signup);
router.post('/signin', signin);
router.put('/update', authMiddleware, updateDetails);
router.get('/bulk', authMiddleware, filterUsers);
module.exports = router;
