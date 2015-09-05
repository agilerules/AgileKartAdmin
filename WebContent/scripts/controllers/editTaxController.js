

angular.module('agilekartV2').controller('EditTaxController', function($scope, $routeParams, $location, TaxResource , TaxRuleResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.tax = new TaxResource(self.original);
            TaxRuleResource.queryAll(function(items) {
                $scope.taxRulesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        taxRuleId : item.taxRuleId
                    };
                    var labelObject = {
                        value : item.taxRuleId,
                        text : item.taxRuleId
                    };
                    if($scope.tax.taxRules){
                        $.each($scope.tax.taxRules, function(idx, element) {
                            if(item.taxRuleId == element.taxRuleId) {
                                $scope.taxRulesSelection.push(labelObject);
                                $scope.tax.taxRules.push(wrappedObject);
                            }
                        });
                        self.original.taxRules = $scope.tax.taxRules;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Taxes");
        };
        TaxResource.get({TaxId:$routeParams.TaxId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.tax);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.tax.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Taxes");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Taxes");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.tax.$remove(successCallback, errorCallback);
    };
    
    $scope.taxRulesSelection = $scope.taxRulesSelection || [];
    $scope.$watch("taxRulesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.tax) {
            $scope.tax.taxRules = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.taxRuleId = selectedItem.value;
                $scope.tax.taxRules.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});