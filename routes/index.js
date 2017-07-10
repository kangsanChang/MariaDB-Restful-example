const user = require('./user');

module.exports.routes = function(app) {
  app.use('/user', user);
  app.get('/', function(req, res) {
    res.json("Success!");
  });
};
