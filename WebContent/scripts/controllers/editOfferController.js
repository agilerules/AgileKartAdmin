

angular.module('agilekartV2').controller('EditOfferController', function($scope, $routeParams, $location, OfferResource , MerchantResource, ProductResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.offer = new OfferResource(self.original);
            MerchantResource.queryAll(function(items) {
                $scope.merchantSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        merchantId : item.merchantId
                    };
                    var labelObject = {
                        value : item.merchantId,
                        text : item.merchantName
                    };
                    if($scope.offer.merchant && item.merchantId == $scope.offer.merchant.merchantId) {
                        $scope.merchantSelection = labelObject;
                        $scope.offer.merchant = wrappedObject;
                        self.original.merchant = $scope.offer.merchant;
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
                        text : item.productName
                    };
                    if($scope.offer.product && item.productId == $scope.offer.product.productId) {
                        $scope.productSelection = labelObject;
                        $scope.offer.product = wrappedObject;
                        self.original.product = $scope.offer.product;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Offers");
        };
        OfferResource.get({OfferId:$routeParams.OfferId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.offer);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.offer.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Offers");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Offers");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.offer.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("merchantSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.offer.merchant = {};
            $scope.offer.merchant.merchantId = selection.value;
        }
    });
    $scope.$watch("productSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.offer.product = {};
            $scope.offer.product.productId = selection.value;
        }
    });
    
    $scope.get();
});