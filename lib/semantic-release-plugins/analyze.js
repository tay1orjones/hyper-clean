// Heavy inspiration from the default implementation:
// https://github.com/semantic-release/commit-analyzer/blob/1821a51841329a468f85f7077f6ceed62ec57cf5/src/index.js

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

  .every((emoji) => {
    if (semanticEmoji.major.includes(emoji)) {
      type = 'major';
      return false;
    }

    if (semanticEmoji.minor.includes(emoji)) type = 'minor';

    if (semanticEmoji.patch.includes(emoji)) type = 'patch';

    return true;
  })

  cb(null, type)
}