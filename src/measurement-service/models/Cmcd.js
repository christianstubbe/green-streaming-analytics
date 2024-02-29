module.exports = (sequelize, DataTypes) => {

    // For more information on the CMCD standard and the meaning of the keys, see:
    // https://cdn.cta.tech/cta/media/media/resources/standards/pdfs/cta-5004-final.pdf
    const Cmcd = sequelize.define("Cmcd", {
        // ID
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        // Client ID
        clientId: {
            type: DataTypes.STRING
        },
        // Type
        type: {
            type: DataTypes.STRING
        },
        // Content ID
        cid: {
            type: DataTypes.STRING
        },
        // Session ID
        sid: {
            type: DataTypes.STRING
        },
        // Encoded bitrate
        br: {
            type: DataTypes.BIGINT
        },
        // Buffer length in miliseconds
        bl: {
            type: DataTypes.BIGINT
        },
        // Buffer starvation
        bs: {
            type: DataTypes.BOOLEAN
        },
        // Object duration in miliseconds
        d: {
            type: DataTypes.BIGINT
        },
        // Deadline in miliseconds
        dl: {
            type: DataTypes.BIGINT
        },
        // Measured throughput in kilobits per second
        mtp: {
            type: DataTypes.BIGINT
        },
        // Next object request
        nor: {
            type: DataTypes.STRING
        },
        // Next range request
        nrr: {
            type: DataTypes.STRING
        },
        // Object type: one of [m,a,v,av,i,c,tt,k,o]
        ot: {
            type: DataTypes.STRING,
            validate: {
                isIn: [['m', 'a', 'v', 'av', 'i', 'c', 'tt', 'k', 'o']]
            }
        },
        // Playback rate: 1 if real-time, 2 if double speed, 0 if not playing
        pr: {
            type: DataTypes.DOUBLE,
            validate: {
                isIn: [[0, 1, 2]]
            }
        },
        // Requested maximum throughput in kilobits per second
        rtp: {
            type: DataTypes.BIGINT
        },
        // Streaming format: one of [d,h,s,o] (dash, hls, smooth, other)
        sf: {
            type: DataTypes.STRING,
            validate: {
                isIn: [['d', 'h', 's', 'o']]
            }
        },
        // Stream type: one of [v,l] (all segments available, live)
        st: {
            type: DataTypes.STRING,
            validate: {
                isIn: [['v', 'l']]
            }
        },
        // Startup
        su: {
            type: DataTypes.BOOLEAN
        },
        // Top bitrate in kilobits per second
        tb: {
            type: DataTypes.BIGINT
        },
        // CMCD version
        v: {
            type: DataTypes.BIGINT
        },
    });

    return Cmcd;

}