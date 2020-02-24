

module.exports = function (sequelize, DataTypes) {

    var Group = sequelize.define("Group", {
        name: {
            type: DataTypes.STRING,
        }
    })

    return Group;
};