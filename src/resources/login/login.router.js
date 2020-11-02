const router = require('express').Router();
const loginService = require('./login.service');

router.route('/').post(async (req, res) => {
  try {
    const token = await loginService.login(req.body);
    res.status(200).json({ token });
  } catch (e) {
    res.status(403).send('Incorrect login or password');
  }
});

module.exports = router;
