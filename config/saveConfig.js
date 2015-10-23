var saveConfig = function(logger, config) {
  return {
    idProperty: '_id',
    logger: logger,
    engine: config.engine,
    debug: config.debug || true};
}
module.exports = saveConfig;
