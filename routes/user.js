var express = require('express');
var models = require('../models');
var bcrypt = require('bcrypt');
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
  bcrypt.hash(req.body.password, 10).then((hash)=>{
    models.User.create({
        userID: req.body.userID,
        password: hash
     }).then(result=>{
        res.json(result);
     }).catch(err => {
        console.error(err);
     });
  });
});

// Find One user
router.get('/:id', (req,res)=>{
  models.User.findOne({where: {userID: req.params.id}}).then((user)=>{
    if(user==null){
      res.json("Cannot find ", req.params.id); // 안되는듯..
    }
    res.json(user);
  }).catch(err => {
    console.error(err);
  });
});

// Update One User
// if password_now === user password : update password to password_new
// if not, don't modify
router.put('/:id', (req,res)=>{
  models.User.findOne({where: {userID: req.params.id}}).then((user)=>{
    bcrypt.compare(req.body.password_now, user.password, (err, matched)=>{
      if(matched){
        console.log("same password! \n");
        bcrypt.hash(req.body.password_new, 10).then((hash)=>{
          models.User.update({password : hash},{where: {userID: req.params.id}})
          .then((user)=>{res.json(user);});
        });
      }else{
        console.error(err);
        res.json("wrong password!");
      }
    });
  }).catch(err =>{
    console.log("Cannot find ",req.params.id);
    console.error(err);
  });
});
module.exports = router;

// Delete One User
router.delete('/:id', (req,res)=>{
  models.User.findOne({where: {userID: req.params.id}}).then((user)=>{
    bcrypt.compare(req.body.password, user.password, (err, matched)=>{
      if(matched){
        models.User.destroy({where: {userID: req.params.id}}).then((user)=>{
          res.json(req.params.id+" is removed");
        });
      }else{
        console.error(err);
        res.json("wrong password!");
      }
    });
  });
});