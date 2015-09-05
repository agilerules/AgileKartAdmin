

angular.module('agilekartV2').controller('EditOrderDetailsController', function($scope, $routeParams, $location, OrderDetailsResource , OrdersResource, ProductResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.orderDetails = new OrderDetailsResource(self.original);
            OrdersResource.queryAll(function(items) {
                $scope.ordersSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        orderId : item.orderId
                    };
                    var labelObject = {
                        value : item.orderId,
                        text : item.orderId
                    };
                    if($scope.orderDetails.orders && item.orderId == $scope.orderDetails.orders.orderId) {
                        $scope.ordersSelection = labelObject;
                        $scope.orderDetails.orders = wrappedObject;
                        self.original.orders = $scope.orderDetails.orders;
                    }
                    return labelObject;
                });
            });
            ProductResource.queryAll(function(items) {
                $scope.productSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        productId : item.productId
                    };
                    var labelObject = {
                        value : item.productId,
                        text : item.productId
                    };
                    if($scope.orderDetails.product && item.productId == $scope.orderDetails.product.productId) {
                        $scope.productSelection = labelObject;
                        $scope.orderDetails.product = wrappedObject;
                        self.original.product = $scope.orderDetails.product;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/OrderDetails");
        };
        OrderDetailsResource.get({OrderDetailsId:$routeParams.OrderDetailsId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.orderDetails);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.orderDetails.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/OrderDetails");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/OrderDetails");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.orderDetails.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("ordersSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.orderDetails.orders = {};
            $scope.orderDetails.orders.orderId = selection.value;
        }
    });
    $scope.$watch("productSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.orderDetails.product = {};
            $scope.orderDetails.product.productId = selection.value;
        }
    });
    
    $scope.get();
});