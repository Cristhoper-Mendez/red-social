const Images = require("./images");
const Comments = require("./comments");
const Stats = require("./stats");

module.exports = async () => {
  const results = await Promise.all([
    Images.popular(),
    Stats(),
    Comments.newest(),
  ]);

  let stats = {};

  stats.sidebar = {
    popular: results[0],
    stats: results[1],
    comments: results[2],
  };

  return stats;
};
