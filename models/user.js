module.exports = function(sequelize, DataTypes){
    const user = sequelize.define('User',{
        userID: {field:'user_id', type: DataTypes.STRING(50), unique: true, allowNull:false },
        password: {field: 'password', type: DataTypes.STRING, allowNull: false},
        }, {
            underscored: true, 
            freezeTableName: true,
        });
    return user;
};

// DB의 user라는 테이블을 User라는 Object로 매핑,
// user_id, password 라는 칼럼은 UserObject의 속성으로 매핑

// define에 적어준 이름으로 table 생성 됨!!!!!
