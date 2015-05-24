
angular.module('agileRulesKart').controller('NewAkOrderDetailsController', function ($scope, $location, locationParser, AkOrderDetailsResource , AkOrdersResource, AkProductsResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.akOrderDetails = $scope.akOrderDetails || {};
    
    $scope.akOrdersList = AkOrdersResource.queryAll(function(items){
        $scope.akOrdersSelectionList = $.map(items, function(item) {
            return ( {
                value : item.orderId,
                text : item.orderId
            });
        });
    });
    $scope.$watch("akOrdersSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.akOrderDetails.akOrders = {};
            $scope.akOrderDetails.akOrders.orderId = selection.value;
        }
    });
    
    $scope.akProductsList = AkProductsResource.queryAll(function(items){
        $scope.akProductsSelectionList = $.map(items, function(item) {
            return ( {
                value : item.productId,
                text : item.productId
            });
        });
    });
    $scope.$watch("akProductsSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.akOrderDetails.akProducts = {};
            $scope.akOrderDetails.akProducts.productId = selection.value;
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/AkOrderDetails/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        AkOrderDetailsResource.save($scope.akOrderDetails, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/AkOrderDetails");
    };
});