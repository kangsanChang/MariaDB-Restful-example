const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// connect router
function configApp() {
  app.use(bodyParser.json({ type: 'application/json' }));
  app.use(bodyParser.urlencoded({ extended: false }));
  require('./routes').routes(app);
}

configApp();

// connect To DB
const models = require('./models');

models.sequelize.sync()
  .then(() => {
    console.log('✓ DB connection success.');
    console.log('  Press CTRL-C to stop\n');
  })
  .catch((err) => {
    console.error(err);
    console.log('✗ DB connection error. Please make sure DB is running.');
    process.exit();
  });

module.exports = app;

// sequelize는 INSERT,UPDATE,SELECT,DELETE 같은 데이터 조작(DML) 뿐만 아니라
// DB의 스키마를 CREATE, ALERT, DROP할 수 있는 데이터 정의(DDL)도 지원함
// 이미 만들어진 DB 테이블에 모델을 매핑할 수도 있고, 정의한 모델을 바탕으로 table을 생성 가능.(sync)
// sync 메서드는 모델에서 정의한 이름의 테이블이 존재하지 않을 경우에만 동작함.
// 테이블이 존재하는 경우에는 models.sequelize.sync({force:true}) 같이 force 옵션을 주어
// 강제적으로 테이블을 제거 후 다시 생성이 가능하지만 아주 위험한 옵션

