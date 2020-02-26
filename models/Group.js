

module.exports = function (sequelize, DataTypes) {

    var Group = sequelize.define("Group", {
        name: {
            type: DataTypes.STRING,
        }
    });

    // Group.associate = function (models) {
    //     Group.hasMany(models.User);
    // };

    return Group;
};