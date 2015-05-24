
angular.module('agileRulesKart').controller('NewAkProductOptionsController', function ($scope, $location, locationParser, AkProductOptionsResource , AkOptionGroupsResource, AkOptionsResource, AkProductsResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.akProductOptions = $scope.akProductOptions || {};
    
    $scope.akOptionGroupsList = AkOptionGroupsResource.queryAll(function(items){
        $scope.akOptionGroupsSelectionList = $.map(items, function(item) {
            return ( {
                value : item.optionGroupId,
                text : item.optionGroupId
            });
        });
    });
    $scope.$watch("akOptionGroupsSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.akProductOptions.akOptionGroups = {};
            $scope.akProductOptions.akOptionGroups.optionGroupId = selection.value;
        }
    });
    
    $scope.akOptionsList = AkOptionsResource.queryAll(function(items){
        $scope.akOptionsSelectionList = $.map(items, function(item) {
            return ( {
                value : item.optionId,
                text : item.optionId
            });
        });
    });
    $scope.$watch("akOptionsSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.akProductOptions.akOptions = {};
            $scope.akProductOptions.akOptions.optionId = selection.value;
        }
    });
    
    $scope.akProductsList = AkProductsResource.queryAll(function(items){
        $scope.akProductsSelectionList = $.map(items, function(item) {
            return ( {
                value : item.productId,
                text : item.productId
            });
        });
    });
    $scope.$watch("akProductsSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.akProductOptions.akProducts = {};
            $scope.akProductOptions.akProducts.productId = selection.value;
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/AkProductOptions/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        AkProductOptionsResource.save($scope.akProductOptions, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/AkProductOptions");
    };
});