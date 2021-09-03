module.exports = {
  LocalStrategy: require("./controller").LocalStrategy,
  GoogleStrategy: require("./controller").GoogleStrategy,
  router: require("./routes"),
};
