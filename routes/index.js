module.exports = function (app) {

    app.use("/api/v1/users", require('./v1/users'));
    app.use("/api/v1/suppliers", require('./v1/suppliers'));
    app.use("/api/v1/countries", require('./v1/country'));
    app.use("/api/v1/roles", require('./v1/roles'));
  };
    
  