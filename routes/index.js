module.exports = function (app) {
    const routes_v1 = require('./v1/routes');
    
    app.use('/v1', routes_v1);

  };
  