

angular.module('agilekartV2').controller('EditTaxRuleMerchantController', function($scope, $routeParams, $location, TaxRuleMerchantResource , MerchantResource, TaxRuleResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.taxRuleMerchant = new TaxRuleMerchantResource(self.original);
            MerchantResource.queryAll(function(items) {
                $scope.merchantSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        merchantId : item.merchantId
                    };
                    var labelObject = {
                        value : item.merchantId,
                        text : item.merchantName
                    };
                    if($scope.taxRuleMerchant.merchant && item.merchantId == $scope.taxRuleMerchant.merchant.merchantId) {
                        $scope.merchantSelection = labelObject;
                        $scope.taxRuleMerchant.merchant = wrappedObject;
                        self.original.merchant = $scope.taxRuleMerchant.merchant;
                    }
                    return labelObject;
                });
            });
            TaxRuleResource.queryAll(function(items) {
                $scope.taxRuleSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        taxRuleId : item.taxRuleId
                    };
                    var labelObject = {
                        value : item.taxRuleId,
                        text : item.taxRuleName
                    };
                    if($scope.taxRuleMerchant.taxRule && item.taxRuleId == $scope.taxRuleMerchant.taxRule.taxRuleId) {
                        $scope.taxRuleSelection = labelObject;
                        $scope.taxRuleMerchant.taxRule = wrappedObject;
                        self.original.taxRule = $scope.taxRuleMerchant.taxRule;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/TaxRuleMerchants");
        };
        TaxRuleMerchantResource.get({TaxRuleMerchantId:$routeParams.TaxRuleMerchantId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.taxRuleMerchant);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.taxRuleMerchant.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/TaxRuleMerchants");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/TaxRuleMerchants");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.taxRuleMerchant.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("merchantSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.taxRuleMerchant.merchant = {};
            $scope.taxRuleMerchant.merchant.merchantId = selection.value;
        }
    });
    $scope.$watch("taxRuleSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.taxRuleMerchant.taxRule = {};
            $scope.taxRuleMerchant.taxRule.taxRuleId = selection.value;
        }
    });
    
    $scope.get();
});