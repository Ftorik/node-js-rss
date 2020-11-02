const JWT = require('jsonwebtoken');
const config = require('../common/config');

const checkAuthorizationToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!authHeader) {
    res.status('401').send('Unauthorized');
    return;
  }

  await JWT.verify(token, config.JWT_SECRET_KEY, err => {
    if (err) {
      res.status('401').send('Unauthorized');
      return;
    }

    next();
    return;
  });
};

module.exports = checkAuthorizationToken;
