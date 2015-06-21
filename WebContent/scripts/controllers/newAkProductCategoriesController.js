
angular.module('agileRulesKart').controller('NewAkProductCategoriesController', function ($scope, $location, locationParser, AkProductCategoriesResource , AkProductsResource, AkCategoryOptionsResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.akProductCategories = $scope.akProductCategories || {};
    
    $scope.akProductsesList = AkProductsResource.queryAll(function(items){
        $scope.akProductsesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.productId,
                text : item.productId
            });
        });
    });
    $scope.$watch("akProductsesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.akProductCategories.akProductses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.productId = selectedItem.value;
                $scope.akProductCategories.akProductses.push(collectionItem);
            });
        }
    });
    
    $scope.akCategoryOptionsesList = AkCategoryOptionsResource.queryAll(function(items){
        $scope.akCategoryOptionsesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.categoryOptionId,
                text : item.categoryOptionId
            });
        });
    });
    $scope.$watch("akCategoryOptionsesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.akProductCategories.akCategoryOptionses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.categoryOptionId = selectedItem.value;
                $scope.akProductCategories.akCategoryOptionses.push(collectionItem);
            });
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/AkProductCategories/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        AkProductCategoriesResource.save($scope.akProductCategories, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/AkProductCategories");
    };
});