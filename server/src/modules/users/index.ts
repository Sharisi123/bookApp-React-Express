module.exports = {
  LocalStrategy: require("./strategies/local.strategy").LocalStrategy,
  GoogleStrategy: require("./strategies/google.strategy").GoogleStrategy,
  GitHubStrategy: require("./strategies/github.strategy").GitHubStrategy,
  router: require("./routes"),
};
