

angular.module('agilekartV2').controller('EditMerchantPaymentGatewayController', function($scope, $routeParams, $location, MerchantPaymentGatewayResource , MerchantResource, PaymentGatewayResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.merchantPaymentGateway = new MerchantPaymentGatewayResource(self.original);
            MerchantResource.queryAll(function(items) {
                $scope.merchantSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        merchantId : item.merchantId
                    };
                    var labelObject = {
                        value : item.merchantId,
                        text : item.merchantName
                    };
                    if($scope.merchantPaymentGateway.merchant && item.merchantId == $scope.merchantPaymentGateway.merchant.merchantId) {
                        $scope.merchantSelection = labelObject;
                        $scope.merchantPaymentGateway.merchant = wrappedObject;
                        self.original.merchant = $scope.merchantPaymentGateway.merchant;
                    }
                    return labelObject;
                });
            });
            PaymentGatewayResource.queryAll(function(items) {
                $scope.paymentGatewaySelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        paymentGatewayId : item.paymentGatewayId
                    };
                    var labelObject = {
                        value : item.paymentGatewayId,
                        text : item.paymentGatewayName
                    };
                    if($scope.merchantPaymentGateway.paymentGateway && item.paymentGatewayId == $scope.merchantPaymentGateway.paymentGateway.paymentGatewayId) {
                        $scope.paymentGatewaySelection = labelObject;
                        $scope.merchantPaymentGateway.paymentGateway = wrappedObject;
                        self.original.paymentGateway = $scope.merchantPaymentGateway.paymentGateway;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/MerchantPaymentGateways");
        };
        MerchantPaymentGatewayResource.get({MerchantPaymentGatewayId:$routeParams.MerchantPaymentGatewayId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.merchantPaymentGateway);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.merchantPaymentGateway.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/MerchantPaymentGateways");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/MerchantPaymentGateways");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.merchantPaymentGateway.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("merchantSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.merchantPaymentGateway.merchant = {};
            $scope.merchantPaymentGateway.merchant.merchantId = selection.value;
        }
    });
    $scope.$watch("paymentGatewaySelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.merchantPaymentGateway.paymentGateway = {};
            $scope.merchantPaymentGateway.paymentGateway.paymentGatewayId = selection.value;
        }
    });
    
    $scope.get();
});