var db = require('mongoose');

var <%= entity %>Schema = new db.Schema({
<% for(var i=0; i< campos.length - 1; i++) { %><%= campos[i]["campo"] %> : <%= campos[i]["tipo"] %> ,
<% } %>
    <%= campos[campos.length - 1]["campo"] %> : <%= campos[campos.length - 1]["tipo"] %>
});

<%= entity %>Schema.statics.getAll<%= entity %>s = function (callback) {
    this.find({}, {}, callback);
};

<%= entity %>Schema.statics.get<%= entity %>ForId = function (id, callback) {
    this.findOne({_id: id}, {}, callback);
};

<%= entity %>Schema.statics.update<%= entity %> = function (entity, callback) {
    this.update({_id: entity._id}, entity, {upsert: true}, callback);
};

<%= entity %>Schema.statics.create<%= entity %> = function (entity, callback) {
    var u = new this(entity);
    u.save(callback);
};

<%= entity %>Schema.statics.deleteForId = function (id, callback) {
    this.get<%= entity %>ForId(id, function(err, entity){
        entity.remove(callback);
    });

};

module.exports = db.model('<%= lentity %>s', <%= entity %>Schema);
