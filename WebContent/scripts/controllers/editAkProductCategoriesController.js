

angular.module('agileRulesKart').controller('EditAkProductCategoriesController', function($scope, $routeParams, $location, AkProductCategoriesResource , AkCategoryOptionsResource, AkProductsResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.akProductCategories = new AkProductCategoriesResource(self.original);
            AkCategoryOptionsResource.queryAll(function(items) {
                $scope.akCategoryOptionsesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        categoryOptionId : item.categoryOptionId
                    };
                    var labelObject = {
                        value : item.categoryOptionId,
                        text : item.categoryOptionId
                    };
                    if($scope.akProductCategories.akCategoryOptionses){
                        $.each($scope.akProductCategories.akCategoryOptionses, function(idx, element) {
                            if(item.categoryOptionId == element.categoryOptionId) {
                                $scope.akCategoryOptionsesSelection.push(labelObject);
                                $scope.akProductCategories.akCategoryOptionses.push(wrappedObject);
                            }
                        });
                        self.original.akCategoryOptionses = $scope.akProductCategories.akCategoryOptionses;
                    }
                    return labelObject;
                });
            });
            AkProductsResource.queryAll(function(items) {
                $scope.akProductsesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        productId : item.productId
                    };
                    var labelObject = {
                        value : item.productId,
                        text : item.productId
                    };
                    if($scope.akProductCategories.akProductses){
                        $.each($scope.akProductCategories.akProductses, function(idx, element) {
                            if(item.productId == element.productId) {
                                $scope.akProductsesSelection.push(labelObject);
                                $scope.akProductCategories.akProductses.push(wrappedObject);
                            }
                        });
                        self.original.akProductses = $scope.akProductCategories.akProductses;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/AkProductCategories");
        };
        AkProductCategoriesResource.get({AkProductCategoriesId:$routeParams.AkProductCategoriesId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.akProductCategories);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.akProductCategories.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/AkProductCategories");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/AkProductCategories");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.akProductCategories.$remove(successCallback, errorCallback);
    };
    
    $scope.akCategoryOptionsesSelection = $scope.akCategoryOptionsesSelection || [];
    $scope.$watch("akCategoryOptionsesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.akProductCategories) {
            $scope.akProductCategories.akCategoryOptionses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.categoryOptionId = selectedItem.value;
                $scope.akProductCategories.akCategoryOptionses.push(collectionItem);
            });
        }
    });
    $scope.akProductsesSelection = $scope.akProductsesSelection || [];
    $scope.$watch("akProductsesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.akProductCategories) {
            $scope.akProductCategories.akProductses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.productId = selectedItem.value;
                $scope.akProductCategories.akProductses.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});