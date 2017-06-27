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
    var register_or_login = "register";

    if (process.env.NODE_ENV === "production") {
        register_or_login = "login"
    }

    // Drop the database
    sails.once("hook:orm:reloaded", function() {
        sails.log("Dropped database");
    });
    sails.emit("hook:orm:reload");

    sails.on("lifted", function() {
        // Create Admin user
        fetch("http://localhost:" + sails.config.port + "/api/" + register_or_login, {
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
                        fetch("http://localhost:" + sails.config.port + "/api/" + register_or_login, {
                                method: "POST",
                                body: JSON.stringify({
                                    username: "Larry",
                                    email: "larry@example.com",
                                    password: "larry"
                                })
                            })
                            .then(res => res.json())
                            .then(u => {
                                sails.log("Created sample user: ", u.username);
                                fetch(
                                        "http://localhost:" + sails.config.port + "/api/" + register_or_login, {
                                            method: "POST",
                                            body: JSON.stringify({
                                                username: "Bob",
                                                email: "bob@example.com",
                                                password: "bob"
                                            })
                                        }
                                    )
                                    .then(res => res.json())
                                    .then(u => {
                                        sails.log("Created sample user: ", u.username);
                                        fetch(
                                                "http://localhost:" + sails.config.port + "/api/" + register_or_login, {
                                                    method: "POST",
                                                    body: JSON.stringify({
                                                        username: "Sam",
                                                        email: "sam@example.com",
                                                        password: "sam"
                                                    })
                                                }
                                            )
                                            .then(res => res.json())
                                            .then(u => {
                                                sails.log("Created sample user: ", u);
                                                fetch(
                                                        "http://localhost:" +
                                                        sails.config.port +
                                                        "/api/channels/" +
                                                        channel.id +
                                                        "/messages", {
                                                            method: "POST",
                                                            headers: {
                                                                Authorization: "Bearer " + u.access_token
                                                            },
                                                            body: JSON.stringify({
                                                                content: "Hey guys what's up?"
                                                            })
                                                        }
                                                    )
                                                    .then(z => {
                                                        fetch(
                                                            "http://localhost:" +
                                                            sails.config.port +
                                                            "/api/channels/" +
                                                            channel.id +
                                                            "/messages", {
                                                                method: "POST",
                                                                headers: {
                                                                    Authorization: "Bearer " + u.access_token
                                                                },
                                                                body: JSON.stringify({
                                                                    content: "I was in class till now."
                                                                })
                                                            }
                                                        );
                                                    })
                                                    .then(i => {
                                                        fetch(
                                                            "http://localhost:" +
                                                            sails.config.port +
                                                            "/api/channels/" +
                                                            channel.id +
                                                            "/messages", {
                                                                method: "POST",
                                                                headers: {
                                                                    Authorization: "Bearer " + u.access_token
                                                                },
                                                                body: JSON.stringify({
                                                                    content: "That final was crazy!"
                                                                })
                                                            }
                                                        );
                                                    });
                                            });
                                    });
                            });
                    });
            });
    });
    done();
};