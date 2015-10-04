'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the fine ' + chalk.red('Ptflystack') + ' generator!'
    ));

    var prompts = [{
      name: 'app',
      message: 'What is the name of your app?'
    },{
      name: 'titulo',
      message: 'What is the title of your app?'
    }, {
      name: 'gituser',
      message: 'What is your Github user?'
    }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;

      this.app = this.props.app;
      this.lapp = this.app.toLowerCase();
      this.titulo = this.props.titulo;
      this.gituser = this.props.gituser;
      done();
    }.bind(this));
  },

  writing: function () {

    this.template("_package.json", "package.json");
    this.template("_bower.json", "bower.json");
    this.template("_travis.yml", ".travis.yml");
    this.template("_karma.config.js", "karma.config.js");
    this.template("_eslintrc", ".eslintrc");
    this.template("_gruntfile.js", "gruntfile.js");

    this.fs.copy(this.templatePath('editorconfig'), this.destinationPath('.editorconfig'));
    this.fs.copy(this.templatePath('jshintrc'), this.destinationPath('.jshintrc'));

    this.template("_app.js", "app.js");
    this.template("_dbutils.js", "dbutils.js");
    this.template("_login.js", "login.js");

    mkdirp("views");
    mkdirp("views/scripts");
    mkdirp("routes");
    mkdirp("models");
    mkdirp("bin");
    mkdirp("assets");
    mkdirp("assets/controllers");
    mkdirp("assets/stylesheets");
    mkdirp("assets/services");
    mkdirp("assets/pages");
    mkdirp("assets/pages/main");
    mkdirp("assets/pages/users");

    this.copy("views/_error.ejs", "views/error.ejs");
    this.copy("views/_index.ejs", "views/index.ejs");
    this.copy("views/_login.ejs", "views/login.ejs");
    this.template("views/scripts/_includeDEVELOP.ejs", "views/scripts/includeDEVELOP.ejs");
    this.template("views/scripts/_includePROD.ejs", "views/scripts/includePROD.ejs");

    this.template("routes/_indexRoute.js", "routes/index.js");
    this.copy("routes/_users.route.js", "routes/users.route.js");
    this.copy("models/_user.server.model.js", "models/user.server.model.js");
    this.template("bin/_www.js", "bin/www.js");
    this.template("assets/controllers/_mainApp.js", "assets/controllers/mainApp.js");
    this.copy("assets/controllers/_usersController.js", "assets/controllers/usersController.js");
    this.copy("assets/services/_user.services.js", "assets/services/user.services.js");
    this.copy("assets/pages/main/_main.html", "assets/pages/main/main.html");
    this.copy("assets/pages/users/_users.html", "assets/pages/users/users.html");
    this.copy("assets/pages/users/_usersdetail.html", "assets/pages/users/usersdetail.html");
    this.template("assets/stylesheets/_style.less", "assets/stylesheets/style.less");

  },

  install: function () {
    this.installDependencies();
  }
});
