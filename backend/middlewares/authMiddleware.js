const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader) {
      res.status(401).json({ error: 'Not authorized' });
      return;
    }
    if (!authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Wrong format' });
      return;
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, jwtSecret);
    if (!decoded.userId) {
      res.status(403).json({ error: 'Error in authorization' });
      return;
    }
    req.userId = decoded.userId;
    // console.log('auth done');
    next();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
    return;
  }
};

module.exports = { authMiddleware };
