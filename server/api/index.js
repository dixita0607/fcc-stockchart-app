const router = require('express').Router();

router.use('/stocks', require('./stocks'));

module.exports = router;
