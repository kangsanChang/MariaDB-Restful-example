const user = require('./user');

module.exports.routes = (app) => {
  app.use('/user', user);
  app.get('/', (req, res) => {
    res.json('Success!');
  });
};
