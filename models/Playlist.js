module.exports = (sequelize, DataTypes) => {
    const Playlist = sequelize.define(
        "Playlist",
        {
          
          musicName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          youtubeEmbed: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          
         
        },
        {
          timestamps: true,
          underscored: true,
        }

      )
      Playlist.associate = (db) =>{
        Playlist.hasMany(db.Chordlist,{
            foreignKey: "playlistId",
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        })
      }

      Playlist.associate = (db) =>{
        Playlist.belongsTo(db.User,{
            foreignKey: "userId",
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        })
      }

      return Playlist
    }