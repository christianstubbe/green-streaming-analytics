module.exports = (sequelize, DataTypes) => {

    const Session = sequelize.define("Session", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        deviceSerialNumber: {
            type: DataTypes.STRING
        },
        deviceIP: {
            type: DataTypes.STRING
        },
        deviceUsername: {
            type: DataTypes.STRING
        },
        devicePassword: {
            type: DataTypes.STRING
        },
        terminatedOn: {
            type: DataTypes.DATE
        }
    });

    return Session;

}