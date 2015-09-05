

angular.module('agilekartV2').controller('EditPaymentGatewayController', function($scope, $routeParams, $location, PaymentGatewayResource , MerchantPaymentGatewayResource, OrdersResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.paymentGateway = new PaymentGatewayResource(self.original);
            MerchantPaymentGatewayResource.queryAll(function(items) {
                $scope.merchantPaymentGatewaysSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        merchantPaymentGatewayId : item.merchantPaymentGatewayId
                    };
                    var labelObject = {
                        value : item.merchantPaymentGatewayId,
                        text : item.merchantPaymentGatewayId
                    };
                    if($scope.paymentGateway.merchantPaymentGateways){
                        $.each($scope.paymentGateway.merchantPaymentGateways, function(idx, element) {
                            if(item.merchantPaymentGatewayId == element.merchantPaymentGatewayId) {
                                $scope.merchantPaymentGatewaysSelection.push(labelObject);
                                $scope.paymentGateway.merchantPaymentGateways.push(wrappedObject);
                            }
                        });
                        self.original.merchantPaymentGateways = $scope.paymentGateway.merchantPaymentGateways;
                    }
                    return labelObject;
                });
            });
            OrdersResource.queryAll(function(items) {
                $scope.ordersesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        orderId : item.orderId
                    };
                    var labelObject = {
                        value : item.orderId,
                        text : item.orderId
                    };
                    if($scope.paymentGateway.orderses){
                        $.each($scope.paymentGateway.orderses, function(idx, element) {
                            if(item.orderId == element.orderId) {
                                $scope.ordersesSelection.push(labelObject);
                                $scope.paymentGateway.orderses.push(wrappedObject);
                            }
                        });
                        self.original.orderses = $scope.paymentGateway.orderses;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/PaymentGateways");
        };
        PaymentGatewayResource.get({PaymentGatewayId:$routeParams.PaymentGatewayId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.paymentGateway);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.paymentGateway.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/PaymentGateways");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/PaymentGateways");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.paymentGateway.$remove(successCallback, errorCallback);
    };
    
    $scope.merchantPaymentGatewaysSelection = $scope.merchantPaymentGatewaysSelection || [];
    $scope.$watch("merchantPaymentGatewaysSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.paymentGateway) {
            $scope.paymentGateway.merchantPaymentGateways = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.merchantPaymentGatewayId = selectedItem.value;
                $scope.paymentGateway.merchantPaymentGateways.push(collectionItem);
            });
        }
    });
    $scope.ordersesSelection = $scope.ordersesSelection || [];
    $scope.$watch("ordersesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.paymentGateway) {
            $scope.paymentGateway.orderses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.orderId = selectedItem.value;
                $scope.paymentGateway.orderses.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});