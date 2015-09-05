

angular.module('agilekartV2').controller('EditProductCategoryController', function($scope, $routeParams, $location, ProductCategoryResource , CategoryResource, ProductResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.productCategory = new ProductCategoryResource(self.original);
            CategoryResource.queryAll(function(items) {
                $scope.categorySelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        categoryId : item.categoryId
                    };
                    var labelObject = {
                        value : item.categoryId,
                        text : item.categoryName
                    };
                    if($scope.productCategory.category && item.categoryId == $scope.productCategory.category.categoryId) {
                        $scope.categorySelection = labelObject;
                        $scope.productCategory.category = wrappedObject;
                        self.original.category = $scope.productCategory.category;
                    }
                    return labelObject;
                });
            });
            ProductResource.queryAll(function(items) {
                $scope.productSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        productId : item.productId
                    };
                    var labelObject = {
                        value : item.productId,
                        text : item.productName
                    };
                    if($scope.productCategory.product && item.productId == $scope.productCategory.product.productId) {
                        $scope.productSelection = labelObject;
                        $scope.productCategory.product = wrappedObject;
                        self.original.product = $scope.productCategory.product;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/ProductCategories");
        };
        ProductCategoryResource.get({ProductCategoryId:$routeParams.ProductCategoryId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.productCategory);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.productCategory.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/ProductCategories");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/ProductCategories");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.productCategory.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("categorySelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.productCategory.category = {};
            $scope.productCategory.category.categoryId = selection.value;
        }
    });
    $scope.$watch("productSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.productCategory.product = {};
            $scope.productCategory.product.productId = selection.value;
        }
    });
    
    $scope.get();
});