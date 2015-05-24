
angular.module('agileRulesKart').controller('NewAkProductsController', function ($scope, $location, locationParser, AkProductsResource , AkProductCategoriesResource, AkOrderDetailsResource, AkProductOptionsResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.akProducts = $scope.akProducts || {};
    
    $scope.akProductCategoriesList = AkProductCategoriesResource.queryAll(function(items){
        $scope.akProductCategoriesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.categoryId,
                text : item.categoryId
            });
        });
    });
    $scope.$watch("akProductCategoriesSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.akProducts.akProductCategories = {};
            $scope.akProducts.akProductCategories.categoryId = selection.value;
        }
    });
    
    $scope.productOnlineOnlyList = [
        "true",
        " false"
    ];
    
    $scope.productUnlimitedList = [
        "true",
        " false"
    ];
    
    $scope.akOrderDetailsesList = AkOrderDetailsResource.queryAll(function(items){
        $scope.akOrderDetailsesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.detailId,
                text : item.detailId
            });
        });
    });
    $scope.$watch("akOrderDetailsesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.akProducts.akOrderDetailses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.detailId = selectedItem.value;
                $scope.akProducts.akOrderDetailses.push(collectionItem);
            });
        }
    });
    
    $scope.akProductOptionsesList = AkProductOptionsResource.queryAll(function(items){
        $scope.akProductOptionsesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.productOptionId,
                text : item.productOptionId
            });
        });
    });
    $scope.$watch("akProductOptionsesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.akProducts.akProductOptionses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.productOptionId = selectedItem.value;
                $scope.akProducts.akProductOptionses.push(collectionItem);
            });
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/AkProducts/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        AkProductsResource.save($scope.akProducts, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/AkProducts");
    };
});