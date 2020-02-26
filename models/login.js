

module.exports = function (sequelize, DataTypes) {
    var Login = sequelize.define("Login", {

        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Login.associate = function (models) {
        Login.hasOne(models.User);
    };

    return Login;
};