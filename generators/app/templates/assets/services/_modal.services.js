mainApp.service('ModalServices', ['$modal', function ($modal) {

    this.popUpToConfirm = function(texto){
        return $modal.open({
            animation: true,
            templateUrl: '/modals/popToConfirm.html',
            controller: 'popToConfirmController',
            size: 'sm',
            resolve: {
                texto: function () {
                    return texto;
                }
            }
        });
    };
}]);
