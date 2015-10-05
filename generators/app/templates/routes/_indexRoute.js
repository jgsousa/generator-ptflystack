module.exports = function (passport) {

  var express = require('express');
  var router = express.Router();
  var debug = require('debug')('<%= app %>App:server');

  var links = [
    { link: "users", label:"Users"}
    //===== yeoman routejs hook =====//
  ];

  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  };

  /* GET home page. */
  router.get('/', isAuthenticated, function (req, res, next) {
    debug(links);
    res.render('index', {username: req.user.name, env: process.env.NODE_ENV, links:links });
  });

  router.get('/login', function (req, res, next) {
    res.render('login', {});
  });

  router.post('/login', passport.authenticate('login',
    {
      successRedirect: '/',
      failureRedirect: '/login'
    }
  ), function (err, docs) {
    debug("Passou login");
  });

  return router;
};
