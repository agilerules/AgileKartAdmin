

angular.module('agileRulesKart').controller('EditAkOrderDetailsController', function($scope, $routeParams, $location, AkOrderDetailsResource , AkOrdersResource, AkProductsResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.akOrderDetails = new AkOrderDetailsResource(self.original);
            AkOrdersResource.queryAll(function(items) {
                $scope.akOrdersSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        orderId : item.orderId
                    };
                    var labelObject = {
                        value : item.orderId,
                        text : item.orderId
                    };
                    if($scope.akOrderDetails.akOrders && item.orderId == $scope.akOrderDetails.akOrders.orderId) {
                        $scope.akOrdersSelection = labelObject;
                        $scope.akOrderDetails.akOrders = wrappedObject;
                        self.original.akOrders = $scope.akOrderDetails.akOrders;
                    }
                    return labelObject;
                });
            });
            AkProductsResource.queryAll(function(items) {
                $scope.akProductsSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        productId : item.productId
                    };
                    var labelObject = {
                        value : item.productId,
                        text : item.productId
                    };
                    if($scope.akOrderDetails.akProducts && item.productId == $scope.akOrderDetails.akProducts.productId) {
                        $scope.akProductsSelection = labelObject;
                        $scope.akOrderDetails.akProducts = wrappedObject;
                        self.original.akProducts = $scope.akOrderDetails.akProducts;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/AkOrderDetails");
        };
        AkOrderDetailsResource.get({AkOrderDetailsId:$routeParams.AkOrderDetailsId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.akOrderDetails);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.akOrderDetails.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/AkOrderDetails");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/AkOrderDetails");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.akOrderDetails.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("akOrdersSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.akOrderDetails.akOrders = {};
            $scope.akOrderDetails.akOrders.orderId = selection.value;
        }
    });
    $scope.$watch("akProductsSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.akOrderDetails.akProducts = {};
            $scope.akOrderDetails.akProducts.productId = selection.value;
        }
    });
    
    $scope.get();
});