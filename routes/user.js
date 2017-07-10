const express = require('express');
const models = require('../models');
const router = express.Router();

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
router.put('/:id', (req,res)=>{
  models.User.update({password : req.body.password},{where: {userID: req.params.id}}).then((user)=>{
    res.json(user);
  });
});
module.exports = router;

// Delete One User
router.delete('/:id', (req,res)=>{
  models.User.destroy({where: {userID: req.params.id}}).then((user)=>{
    res.json(req.params.id+" is removed");
  });
});