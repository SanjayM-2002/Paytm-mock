const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { getBalance, sendMoney } = require('../controllers/accountController');
const router = express.Router();
router.get('/balance', authMiddleware, getBalance);
router.post('/transfer', authMiddleware, sendMoney);
module.exports = router;
