

angular.module('agileRulesKart').controller('EditAkProductsController', function($scope, $routeParams, $location, AkProductsResource , AkProductCategoriesResource, AkOrderDetailsResource, AkProductOptionsResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.akProducts = new AkProductsResource(self.original);
            AkProductCategoriesResource.queryAll(function(items) {
                $scope.akProductCategoriesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        categoryId : item.categoryId
                    };
                    var labelObject = {
                        value : item.categoryId,
                        text : item.categoryId
                    };
                    if($scope.akProducts.akProductCategories && item.categoryId == $scope.akProducts.akProductCategories.categoryId) {
                        $scope.akProductCategoriesSelection = labelObject;
                        $scope.akProducts.akProductCategories = wrappedObject;
                        self.original.akProductCategories = $scope.akProducts.akProductCategories;
                    }
                    return labelObject;
                });
            });
            AkOrderDetailsResource.queryAll(function(items) {
                $scope.akOrderDetailsesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        detailId : item.detailId
                    };
                    var labelObject = {
                        value : item.detailId,
                        text : item.detailId
                    };
                    if($scope.akProducts.akOrderDetailses){
                        $.each($scope.akProducts.akOrderDetailses, function(idx, element) {
                            if(item.detailId == element.detailId) {
                                $scope.akOrderDetailsesSelection.push(labelObject);
                                $scope.akProducts.akOrderDetailses.push(wrappedObject);
                            }
                        });
                        self.original.akOrderDetailses = $scope.akProducts.akOrderDetailses;
                    }
                    return labelObject;
                });
            });
            AkProductOptionsResource.queryAll(function(items) {
                $scope.akProductOptionsesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        productOptionId : item.productOptionId
                    };
                    var labelObject = {
                        value : item.productOptionId,
                        text : item.productOptionId
                    };
                    if($scope.akProducts.akProductOptionses){
                        $.each($scope.akProducts.akProductOptionses, function(idx, element) {
                            if(item.productOptionId == element.productOptionId) {
                                $scope.akProductOptionsesSelection.push(labelObject);
                                $scope.akProducts.akProductOptionses.push(wrappedObject);
                            }
                        });
                        self.original.akProductOptionses = $scope.akProducts.akProductOptionses;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/AkProducts");
        };
        AkProductsResource.get({AkProductsId:$routeParams.AkProductsId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.akProducts);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.akProducts.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/AkProducts");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/AkProducts");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.akProducts.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("akProductCategoriesSelection", function(selection) {
        if (typeof selection != 'undefined') {
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
    $scope.akOrderDetailsesSelection = $scope.akOrderDetailsesSelection || [];
    $scope.$watch("akOrderDetailsesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.akProducts) {
            $scope.akProducts.akOrderDetailses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.detailId = selectedItem.value;
                $scope.akProducts.akOrderDetailses.push(collectionItem);
            });
        }
    });
    $scope.akProductOptionsesSelection = $scope.akProductOptionsesSelection || [];
    $scope.$watch("akProductOptionsesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.akProducts) {
            $scope.akProducts.akProductOptionses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.productOptionId = selectedItem.value;
                $scope.akProducts.akProductOptionses.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});