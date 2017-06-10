/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */
require("es6-promise").polyfill();
require("isomorphic-fetch");

module.exports.bootstrap = function(done) {
  // Don't seed fake data when running in production.
  if (process.env.NODE_ENV === "production") {
    return done();
  }

  // Drop the database
  sails.once("hook:orm:reloaded", function() {
    sails.log("Dropped database");
  });
  sails.emit("hook:orm:reload");

  sails.on("lifted", function() {
    fetch("http://localhost:" + sails.config.port + "/api/register", {
      method: "POST",
      body: JSON.stringify({
        username: "admin",
        email: "admin",
        password: "admin"
      })
    })
      .then(res => {
        if (res.status >= 400)
          throw new Error("Bad response from server(user)", res.statusText);
        return res.json();
      })
      .then(user => {
        sails.log("Created admin user");
        sails.log(user.access_token);
        fetch("http://localhost:" + sails.config.port + "/api/channels", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + user.access_token
          },
          body: "name=#general&topic=the main chat server"
        })
          .then(res2 => {
            if (res2.status >= 400) throw new Error();
            return res2.json();
          })
          .then(channel => {
            sails.log("Created main channel - #general");
          });
      });
  });
  done();
};
