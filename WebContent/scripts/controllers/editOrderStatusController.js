

angular.module('agilekartV2').controller('EditOrderStatusController', function($scope, $routeParams, $location, OrderStatusResource , OrderStatusDescResource, OrdersResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.orderStatus = new OrderStatusResource(self.original);
            OrderStatusDescResource.queryAll(function(items) {
                $scope.orderStatusDescSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        orderStatusDescId : item.orderStatusDescId
                    };
                    var labelObject = {
                        value : item.orderStatusDescId,
                        text : item.orderStatusDescText
                    };
                    if($scope.orderStatus.orderStatusDesc && item.orderStatusDescId == $scope.orderStatus.orderStatusDesc.orderStatusDescId) {
                        $scope.orderStatusDescSelection = labelObject;
                        $scope.orderStatus.orderStatusDesc = wrappedObject;
                        self.original.orderStatusDesc = $scope.orderStatus.orderStatusDesc;
                    }
                    return labelObject;
                });
            });
            OrdersResource.queryAll(function(items) {
                $scope.ordersSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        orderId : item.orderId
                    };
                    var labelObject = {
                        value : item.orderId,
                        text : item.orderId
                    };
                    if($scope.orderStatus.orders && item.orderId == $scope.orderStatus.orders.orderId) {
                        $scope.ordersSelection = labelObject;
                        $scope.orderStatus.orders = wrappedObject;
                        self.original.orders = $scope.orderStatus.orders;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/OrderStatuses");
        };
        OrderStatusResource.get({OrderStatusId:$routeParams.OrderStatusId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.orderStatus);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.orderStatus.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/OrderStatuses");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/OrderStatuses");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.orderStatus.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("orderStatusDescSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.orderStatus.orderStatusDesc = {};
            $scope.orderStatus.orderStatusDesc.orderStatusDescId = selection.value;
        }
    });
    $scope.$watch("ordersSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.orderStatus.orders = {};
            $scope.orderStatus.orders.orderId = selection.value;
        }
    });
    
    $scope.get();
});