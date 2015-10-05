mainApp.controller("<%= lentity %>sController", ['$scope', '<%= entity %>Services', '$q', 'ModalServices',
    function ($scope, <%= entity %>Services, $q, ModalServices) {

        <%= entity %>Services.getAll<%= entity %>s().then(function (data) {
            $scope.<%= lentity %>s = data;
        }, function (data) {

        });

        var delete<%= entity %> = function(code){
                return <%= entity %>Services.delete<%= entity %>($scope.selected._id);
            },
            remove<%= entity %>FromTable = function(){
                var index = $scope.<%= lentity %>s.indexOf($scope.selected);
                if (index > -1) {
                    $scope.<%= lentity %>s.splice(index, 1);
                }
            };

        $scope.requestDeleteSelected = function (<%= lentity %>) {
            $scope.selected = <%= lentity %>;
            var pop = ModalServices.popUpToConfirm( "Deseja apagar este <%= lentity %>?");

            pop.result.
                then(delete<%= entity %>).
                then(remove<%= entity %>FromTable);
        };
    }]);

mainApp.controller("<%= lentity %>sDetailController", ['$scope', '$routeParams', 'ngToast', '<%= entity %>Services', '$location',
    function ($scope, $routeParams, ngToast, <%= entity %>Services, $location) {

        <%= entity %>Services.get<%= entity %>ForId($routeParams.id).then(function (data) {
            if (data) {
                $scope.<%= lentity %>Data = data;
            } else {
                $location.path('/<%= lentity %>s/');
            }
        }, function (err) {
        });

        $scope.gravar = function () {

            if ($scope.modificarForm.$valid) {
                <%= entity %>Services.update<%= entity %>($routeParams.id, $scope.<%= lentity %>Data).then(function (data) {
                    ngToast.create('Gravado com sucesso');
                }, function (err) {
                });
            }
        };
    }]);

mainApp.controller("criar<%= entity %>sController", ['$scope', '$routeParams', 'ngToast', '<%= entity %>Services','$location',
    function ($scope, $routeParams, ngToast, <%= entity %>Services, $location) {
        $scope.gravar = function () {
            if ($scope.modificarForm.$valid) {
                    <%= entity %>Services.create<%= entity %>($scope.<%= lentity %>Data).then(function () {
                        ngToast.create('Gravado com sucesso');
                        $location.path('/<%= lentity %>s/');
                    }, function (err) {
                    });
            }
        };
    }]);
