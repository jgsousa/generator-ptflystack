mainApp.service('<%= entity %>Services', ['$http', '$q', function ($http, $q) {

    this.getAll<%= entity %>s = function () {
        return $http.get('/<%= lentity %>s').
            then(function(response){
               return response.data;
            });
    };

    this.get<%= entity %>ForId = function (id) {
        return $http.get('/<%= lentity %>s' + '/' + id).
            then(function(response){
                return response.data;
            },function(response){
               $q.reject(response.data);
            });
    };

    this.create<%= entity %> = function (data) {
        return $http.post('/<%= lentity %>s/', data, {}).
            then(function(response){
              return response.data;
            });
    };

    this.update<%= entity %> = function (id, data) {
        return $http.put('/<%= lentity %>s' + '/' + id, data, {}).
            then(function(response){
               return response.data;
            });
    };

    this.delete<%= entity %> = function (id) {
        return $http.delete('/<%= lentity %>s' + '/' + id, {}).
            then(function(response){
               return id;
            });
    };

}]);
