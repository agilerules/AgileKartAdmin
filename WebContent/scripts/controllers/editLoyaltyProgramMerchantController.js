

angular.module('agilekartV2').controller('EditLoyaltyProgramMerchantController', function($scope, $routeParams, $location, LoyaltyProgramMerchantResource , MerchantResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.loyaltyProgramMerchant = new LoyaltyProgramMerchantResource(self.original);
            MerchantResource.queryAll(function(items) {
                $scope.merchantSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        merchantId : item.merchantId
                    };
                    var labelObject = {
                        value : item.merchantId,
                        text : item.merchantId
                    };
                    if($scope.loyaltyProgramMerchant.merchant && item.merchantId == $scope.loyaltyProgramMerchant.merchant.merchantId) {
                        $scope.merchantSelection = labelObject;
                        $scope.loyaltyProgramMerchant.merchant = wrappedObject;
                        self.original.merchant = $scope.loyaltyProgramMerchant.merchant;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/LoyaltyProgramMerchants");
        };
        LoyaltyProgramMerchantResource.get({LoyaltyProgramMerchantId:$routeParams.LoyaltyProgramMerchantId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.loyaltyProgramMerchant);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.loyaltyProgramMerchant.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/LoyaltyProgramMerchants");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/LoyaltyProgramMerchants");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.loyaltyProgramMerchant.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("merchantSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.loyaltyProgramMerchant.merchant = {};
            $scope.loyaltyProgramMerchant.merchant.merchantId = selection.value;
        }
    });
    
    $scope.get();
});