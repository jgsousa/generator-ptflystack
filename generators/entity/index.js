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
      'Welcome to the ' + chalk.red('PTFly Entity') + ' subgenerator!'
    ));

    var promptsBasic = [
      {
        name: 'entity',
        message: 'What is the name of the entity?'
      }
    ];
    this.prompt(promptsBasic, function (props) {
      this.entity = props.entity;
      this.lentity = this.entity.toLowerCase();
      done();
    }.bind(this));
  },

  prompting2: function () {
    var done = this.async();


    var promptsField = [
      {
        name: 'campo',
        message: 'What is field name? (enter to finish)'
      },
      {
        when: function(response) {
          if (response.campo === ""){
            return false;
          } else {
            return true;
          }
        },
        type: 'checkbox',
        name: 'type',
        message: 'Field type?',
        choices: [{
          name: "String",
          value: "String"
        }, {
          name: "Number",
          value: "Number"
        }, {
          name: "Boolean",
          value: "Boolean"
        }]
      }
    ];
    this.prompt(promptsField, function (props) {
      if( props.campo === ""){
        done();
      } else {
        if (!this.campos){
          this.campos = [];
        }
        var campo = {};
        campo.campo = props.campo;
        campo.tipo = props.type;
        this.campos.push(campo);
        this.prompting2();
      }
    }.bind(this));
  },

  creator : function(){

    mkdirp("assets/controllers/");
    this.filename1 = "assets/controllers/" + this.lentity + "sController.js";
    this.template("_viewController.js", this.filename1);

    mkdirp("assets/pages/");
    this.filename2 = "assets/pages/" + this.lentity + "s/" + this.lentity + "s.html";
    this.template("_view.html", this.filename2);

    mkdirp("assets/pages/" + this.lentity + "s/");
    this.filename3 = "assets/pages/" + this.lentity + "s/" + this.lentity + "detail.html";
    this.template("_viewdetail.html", this.filename3);

    mkdirp("routes/");
    this.filename4 = "routes/" + this.lentity + "s.route.js";
    this.template("_view.route.js", this.filename4);

    mkdirp("assets/services/");
    this.filename5 = "assets/services/" + this.lentity + "s.services.js";
    this.template("_view.services.js", this.filename5);

    mkdirp("models/");
    this.filename6 = "models/" + this.lentity + ".server.model.js";
    this.template("_view.server.model.js", this.filename6);

  },

  updateRoute : function(){
    var hook   = '//===== yeoman routejs hook =====//',
      path   = 'routes/index.js',
      file   = this.readFileAsString(path),
      insert = ',{ link: "' + this.lentity + 's", label:"' + this.entity + 's"}';

    if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, insert+'\n'+hook));
    }
  },

  updateMainApp : function(){
    var hook   = '//===== yeoman mainapp hook =====//',
      path   = 'assets/controllers/mainApp.js',
      file   = this.readFileAsString(path),

      insert = ".when('/" + this.lentity + "s', {\n" +
        " templateUrl: 'pages/" + this.lentity + "s/" + this.lentity + "s.html',\n" +
        " controller: '" + this.lentity + "sController'\n" +
        "})\n" +

        ".when('/criar" + this.lentity + "', {\n" +
        "  templateUrl: 'pages/" + this.lentity + "s/" + this.lentity + "detail.html',\n" +
        "  controller: 'criar" + this.entity + "sController'\n" +
        "})\n" +

        ".when('/" + this.lentity + "s/:id', {\n" +
        "  templateUrl: 'pages/" + this.lentity + "s/" + this.lentity + "detail.html',\n" +
        "  controller: '" + this.lentity + "sDetailController'\n" +
        "})\n";

    if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, insert+'\n'+hook));
    }
  },

  updateNodeApp : function() {
    var hook = '//===== yeoman useroute hook =====//',
      hook2 = '//===== yeoman approutes hook =====//',
      path = 'app.js',
      file = this.readFileAsString(path),
      insert = "app.use('/" + this.lentity + "s', exposeDb, " + this.lentity + "s(passport));",
      insert2 = "var " + this.lentity + "s = require('./routes/" + this.lentity + "s.route');";

    if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, insert + '\n' + hook).replace(hook2,insert2 + '\n' + hook2 ));
    }
  },

  updateIncludes : function() {
    var hook = "<!-- //===== yeoman includes hook =====// -->",
      path = 'views/scripts/includeDEVELOP.ejs',
      file = this.readFileAsString(path),
      insert = '<script src="/controllers/' + this.lentity + "sController.js" + '"></script>\n' +
                '<script src="/pages/' + this.lentity + "s/" + this.lentity + "s.html" + '"></script>\n' +
                '<script src="/pages/' + this.lentity + "s/" + this.lentity +  "detail.html" + '"></script>\n' +
                '<script src="/services/' + this.lentity + "s.services.js" + '"></script>\n';

    if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, insert + '\n' + hook));
    }
  }
});
