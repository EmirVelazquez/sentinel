

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.difine("User", {

        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        phone_number: {
            type: DataTypes.STRING
        }
    });


    User.associate = function (models) {
        User.hasMany(models.Group);
    };

    return User;
}