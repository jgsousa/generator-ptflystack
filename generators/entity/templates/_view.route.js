module.exports = function (passport) {
    var express = require('express');
    var router = express.Router();
    var <%= entity %> = require('../models/<%= lentity %>.server.model.js');

    var isAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="App Server"');
        res.end('Unauthorized');
    };

    router.get('/', isAuthenticated,function (req, res, next) {
        <%= entity %>.getAll<%= entity %>s(function (err, docs) {
            res.json(docs);
        });
    });

    router.post('/',isAuthenticated, function (req, res, next) {
        <%= entity %>.create<%= entity %>(req.body, function (err, docs) {
            res.send("ok");
        });
    });

    router.get('/:id',isAuthenticated, function (req, res, next) {
        var id = req.params.id;
        <%= entity %>.get<%= entity %>ForId(id, function (err, docs) {
            res.json(docs);
        });
    });

    router.put('/:id',isAuthenticated, function (req, res, next) {
        var <%= lentity %> = req.body;
        <%= lentity %>.updated_at = Date.now();
        <%= entity %>.update<%= entity %>(<%= lentity %>, function (err, docs) {
            res.send("ok");
        });
    });

    router.delete('/:id',isAuthenticated, function (req, res, next) {
        var <%= lentity %> = req.params.id;
        <%= entity %>.deleteForId(<%= lentity %>, function (err, docs) {
            res.send("ok");
        });
    });

    return router;
};
