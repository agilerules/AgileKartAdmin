

angular.module('agilekartV2').controller('EditMerchantAddressController', function($scope, $routeParams, $location, MerchantAddressResource , MerchantResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.merchantAddress = new MerchantAddressResource(self.original);
            MerchantResource.queryAll(function(items) {
                $scope.merchantSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        merchantId : item.merchantId
                    };
                    var labelObject = {
                        value : item.merchantId,
                        text : item.merchantName
                    };
                    if($scope.merchantAddress.merchant && item.merchantId == $scope.merchantAddress.merchant.merchantId) {
                        $scope.merchantSelection = labelObject;
                        $scope.merchantAddress.merchant = wrappedObject;
                        self.original.merchant = $scope.merchantAddress.merchant;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/MerchantAddresses");
        };
        MerchantAddressResource.get({MerchantAddressId:$routeParams.MerchantAddressId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.merchantAddress);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.merchantAddress.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/MerchantAddresses");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/MerchantAddresses");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.merchantAddress.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("merchantSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.merchantAddress.merchant = {};
            $scope.merchantAddress.merchant.merchantId = selection.value;
        }
    });
    
    $scope.get();
});