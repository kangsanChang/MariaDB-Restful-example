var express = require('express');
var models = require('../models');
var router = express.Router();

router.route('/')
  .get((req, res, next) => {
    models.User.findAll().then((results) => {
      res.json(results);
      // findAll 사용하기 전에 확실히 존재하는 table인지 확인해야 함.
    }).catch((err) => {
      next(1007);
    });
  })
  .post((req, res, next) => {
    var options = req.fetchParameter(['user_id']);
    if (req.checkParamErr(options)) return next(options);

    models.User.create({username: options.username}).then((result) => {
      res.json(result);
    }).catch((err) => {
      console.log(err);
      next(1006);
    });
  });

module.exports = router;
