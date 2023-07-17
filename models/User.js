module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

    },
    {
      timestamps: true,
      underscored: true,
    }

  );
  User.associate = (db) => {
    User.hasMany(db.Playlist, {
      foreignKey: 'userId',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    })
  }

  return User
}

