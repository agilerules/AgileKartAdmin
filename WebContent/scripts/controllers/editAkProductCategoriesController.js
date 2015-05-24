

angular.module('agileRulesKart').controller('EditAkProductCategoriesController', function($scope, $routeParams, $location, AkProductCategoriesResource , AkProductsResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.akProductCategories = new AkProductCategoriesResource(self.original);
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