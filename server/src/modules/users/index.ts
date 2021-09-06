module.exports = {
  LocalStrategy: require("./controller").LocalStrategy,
  GoogleStrategy: require("./controller").GoogleStrategy,
  GitHubStrategy: require("./controller").GitHubStrategy,
  router: require("./routes"),
};
