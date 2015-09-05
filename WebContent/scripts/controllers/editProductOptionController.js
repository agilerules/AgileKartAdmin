

angular.module('agilekartV2').controller('EditProductOptionController', function($scope, $routeParams, $location, ProductOptionResource , OptionGroupsResource, OptionsResource, ProductResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.productOption = new ProductOptionResource(self.original);
            OptionGroupsResource.queryAll(function(items) {
                $scope.optionGroupsSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        optionGroupId : item.optionGroupId
                    };
                    var labelObject = {
                        value : item.optionGroupId,
                        text : item.optionGroupName
                    };
                    if($scope.productOption.optionGroups && item.optionGroupId == $scope.productOption.optionGroups.optionGroupId) {
                        $scope.optionGroupsSelection = labelObject;
                        $scope.productOption.optionGroups = wrappedObject;
                        self.original.optionGroups = $scope.productOption.optionGroups;
                    }
                    return labelObject;
                });
            });
            OptionsResource.queryAll(function(items) {
                $scope.optionsSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        optionId : item.optionId
                    };
                    var labelObject = {
                        value : item.optionId,
                        text : item.optionName
                    };
                    if($scope.productOption.options && item.optionId == $scope.productOption.options.optionId) {
                        $scope.optionsSelection = labelObject;
                        $scope.productOption.options = wrappedObject;
                        self.original.options = $scope.productOption.options;
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
                    if($scope.productOption.product && item.productId == $scope.productOption.product.productId) {
                        $scope.productSelection = labelObject;
                        $scope.productOption.product = wrappedObject;
                        self.original.product = $scope.productOption.product;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/ProductOptions");
        };
        ProductOptionResource.get({ProductOptionId:$routeParams.ProductOptionId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.productOption);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.productOption.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/ProductOptions");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/ProductOptions");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.productOption.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("optionGroupsSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.productOption.optionGroups = {};
            $scope.productOption.optionGroups.optionGroupId = selection.value;
        }
    });
    $scope.$watch("optionsSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.productOption.options = {};
            $scope.productOption.options.optionId = selection.value;
        }
    });
    $scope.$watch("productSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.productOption.product = {};
            $scope.productOption.product.productId = selection.value;
        }
    });
    
    $scope.get();
});