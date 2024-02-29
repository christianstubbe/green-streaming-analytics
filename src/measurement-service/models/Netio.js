module.exports = (sequelize, DataTypes) => {

    // For more information about the netio API, see:
    // https://www.netio-products.com/files/NETIO-M2M-API-Protocol-JSON.pdf
    const Netio = sequelize.define("Netio", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        session_id: {
            type: DataTypes.STRING
        },
        //Agent
        model: {
            type: DataTypes.STRING,
        },
        device_name: {
            type: DataTypes.STRING
        },
        mac: {
            type: DataTypes.STRING
        },
        serial_number: {
            type: DataTypes.STRING
        },
        num_outputs: {
            type: DataTypes.DATE
        },

        //Global Measurements
        voltage: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        frequency: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        total_current: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        overall_powerfactor: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        phase: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        total_load: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total_energy: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });

    return Netio;

}