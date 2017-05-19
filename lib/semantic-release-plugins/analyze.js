// Heavy inspiration from the default implementation:
// https://github.com/semantic-release/commit-analyzer/blob/1821a51841329a468f85f7077f6ceed62ec57cf5/src/index.js

var emojis = require('../emojis');

module.exports = function (pluginConfig, {commits}, cb) {
  let type = null;
  let semanticEmoji = {
    "major": [
      "boom"
    ],
    "minor": [
      "sparkles",
      "bug",
      "zap"
    ],
    "patch": [
      "memo",
      "blue_heart",
      "art",
      "hammer",
      "white_check_mark"
    ]
  };

  commits
  
  .map((commit) => {
    return commit.message.split(":")[1];
  })

  .every((currentEmojiName) => {
    if (currentEmojiName) {

      // find the proper semver string from emojis.json
      type = emojis.find((emoji) => {
        return emoji.name === currentEmojiName;
      }).semver;

      return (type === "major") ?  false : true;

    } else {

      return false;

    }
  });

  cb(null, type)
}