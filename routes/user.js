var express = require('express');
var models = require('../models');
var router = express.Router();

// Find all user
router.get('/', (req, res, next) => {
    models.User.findAll().then((results) => {
      res.json(results);
      // findAll 사용하기 전에 확실히 존재하는 table인지 확인해야 함. 당연하지만, 틀리면 model 못찾음
    }).catch((err) => {
      next(1007);
    });
  });
  
// Create user
router.post('/', (req,res)=>{
    models.User.create({
        userID: req.body.userID,
        password: req.body.password
     }).then(result=>{
        res.json(result);
     }).catch(err => {
        console.error(err);
     });
});

module.exports = router;
