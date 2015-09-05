

angular.module('agilekartV2').controller('EditMerchantCategoryController', function($scope, $routeParams, $location, MerchantCategoryResource , CategoryResource, MerchantResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.merchantCategory = new MerchantCategoryResource(self.original);
            CategoryResource.queryAll(function(items) {
                $scope.categorySelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        categoryId : item.categoryId
                    };
                    var labelObject = {
                        value : item.categoryId,
                        text : item.categoryName
                    };
                    if($scope.merchantCategory.category && item.categoryId == $scope.merchantCategory.category.categoryId) {
                        $scope.categorySelection = labelObject;
                        $scope.merchantCategory.category = wrappedObject;
                        self.original.category = $scope.merchantCategory.category;
                    }
                    return labelObject;
                });
            });
            MerchantResource.queryAll(function(items) {
                $scope.merchantSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        merchantId : item.merchantId
                    };
                    var labelObject = {
                        value : item.merchantId,
                        text : item.merchantName
                    };
                    if($scope.merchantCategory.merchant && item.merchantId == $scope.merchantCategory.merchant.merchantId) {
                        $scope.merchantSelection = labelObject;
                        $scope.merchantCategory.merchant = wrappedObject;
                        self.original.merchant = $scope.merchantCategory.merchant;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/MerchantCategories");
        };
        MerchantCategoryResource.get({MerchantCategoryId:$routeParams.MerchantCategoryId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.merchantCategory);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.merchantCategory.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/MerchantCategories");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/MerchantCategories");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.merchantCategory.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("categorySelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.merchantCategory.category = {};
            $scope.merchantCategory.category.categoryId = selection.value;
        }
    });
    $scope.$watch("merchantSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.merchantCategory.merchant = {};
            $scope.merchantCategory.merchant.merchantId = selection.value;
        }
    });
    
    $scope.get();
});