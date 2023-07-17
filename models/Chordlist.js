module.exports = (sequelize, DataTypes) => {
    const Chordlist = sequelize.define(
      "Chordlist",
      {
        // playlistId: {
        //   type: DataTypes.INTEGER,
        //   allowNull: false
        // },
        time: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        chord: {
          type: DataTypes.STRING,
          allowNull: false,
        }

  
       
      },
      {
        timestamps: false,
        underscored: true,
      }
    );
  
    Chordlist.associate = (db) => {
      Chordlist.belongsTo(db.Playlist, {
        foreignKey: "playlistId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    };
  
    return Chordlist;
  };
  