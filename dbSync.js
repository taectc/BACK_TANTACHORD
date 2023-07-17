const { sequelize, User, Chordlist, Playlist } = require("./models");
const bcrypt = require('bcryptjs')

const hashed = bcrypt.hashSync("123456")


sequelize
  .sync({ force: true })
  .then(() => {
    return User.bulkCreate([
      { username: "Admin", password: hashed, isAdmin: true },
      { username: "AAA", password: hashed },
      { username: "BBB", password: hashed },
    ]);
  })
  .then(() => {
    return Playlist.bulkCreate([
      { 
        musicName: "ก่อน",
        youtubeEmbed: "Bn5JCe-7aIg",
        userId: "1"
      
      },
    ]);
  })
  .then(() => {
    return Chordlist.bulkCreate([

      {
      
        playlistId: 1,
        time: "1.5",
        chord: "A",
      },
      {
    
        playlistId: 1,
        time: "6",
        chord: "F Sharp minor",
      }
      
    ]);

  })

  .then(() => process.exit(0))
  .catch((err) => console.log(err.message));



