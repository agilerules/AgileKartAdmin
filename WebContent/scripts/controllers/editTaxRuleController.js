

angular.module('agilekartV2').controller('EditTaxRuleController', function($scope, $routeParams, $location, TaxRuleResource , TaxResource, TaxRuleMerchantResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.taxRule = new TaxRuleResource(self.original);
            TaxResource.queryAll(function(items) {
                $scope.taxSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        taxId : item.taxId
                    };
                    var labelObject = {
                        value : item.taxId,
                        text : item.taxId
                    };
                    if($scope.taxRule.tax && item.taxId == $scope.taxRule.tax.taxId) {
                        $scope.taxSelection = labelObject;
                        $scope.taxRule.tax = wrappedObject;
                        self.original.tax = $scope.taxRule.tax;
                    }
                    return labelObject;
                });
            });
            TaxRuleMerchantResource.queryAll(function(items) {
                $scope.taxRuleMerchantsSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        taxRuleMerchantId : item.taxRuleMerchantId
                    };
                    var labelObject = {
                        value : item.taxRuleMerchantId,
                        text : item.taxRuleMerchantId
                    };
                    if($scope.taxRule.taxRuleMerchants){
                        $.each($scope.taxRule.taxRuleMerchants, function(idx, element) {
                            if(item.taxRuleMerchantId == element.taxRuleMerchantId) {
                                $scope.taxRuleMerchantsSelection.push(labelObject);
                                $scope.taxRule.taxRuleMerchants.push(wrappedObject);
                            }
                        });
                        self.original.taxRuleMerchants = $scope.taxRule.taxRuleMerchants;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/TaxRules");
        };
        TaxRuleResource.get({TaxRuleId:$routeParams.TaxRuleId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.taxRule);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.taxRule.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/TaxRules");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/TaxRules");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.taxRule.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("taxSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.taxRule.tax = {};
            $scope.taxRule.tax.taxId = selection.value;
        }
    });
    $scope.taxRuleMerchantsSelection = $scope.taxRuleMerchantsSelection || [];
    $scope.$watch("taxRuleMerchantsSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.taxRule) {
            $scope.taxRule.taxRuleMerchants = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.taxRuleMerchantId = selectedItem.value;
                $scope.taxRule.taxRuleMerchants.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});