

angular.module('agileRulesKart').controller('EditAkProductOptionsController', function($scope, $routeParams, $location, AkProductOptionsResource , AkOptionGroupsResource, AkOptionsResource, AkProductsResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.akProductOptions = new AkProductOptionsResource(self.original);
            AkOptionGroupsResource.queryAll(function(items) {
                $scope.akOptionGroupsSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        optionGroupId : item.optionGroupId
                    };
                    var labelObject = {
                        value : item.optionGroupId,
                        text : item.optionGroupId
                    };
                    if($scope.akProductOptions.akOptionGroups && item.optionGroupId == $scope.akProductOptions.akOptionGroups.optionGroupId) {
                        $scope.akOptionGroupsSelection = labelObject;
                        $scope.akProductOptions.akOptionGroups = wrappedObject;
                        self.original.akOptionGroups = $scope.akProductOptions.akOptionGroups;
                    }
                    return labelObject;
                });
            });
            AkOptionsResource.queryAll(function(items) {
                $scope.akOptionsSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        optionId : item.optionId
                    };
                    var labelObject = {
                        value : item.optionId,
                        text : item.optionId
                    };
                    if($scope.akProductOptions.akOptions && item.optionId == $scope.akProductOptions.akOptions.optionId) {
                        $scope.akOptionsSelection = labelObject;
                        $scope.akProductOptions.akOptions = wrappedObject;
                        self.original.akOptions = $scope.akProductOptions.akOptions;
                    }
                    return labelObject;
                });
            });
            AkProductsResource.queryAll(function(items) {
                $scope.akProductsSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        productId : item.productId
                    };
                    var labelObject = {
                        value : item.productId,
                        text : item.productId
                    };
                    if($scope.akProductOptions.akProducts && item.productId == $scope.akProductOptions.akProducts.productId) {
                        $scope.akProductsSelection = labelObject;
                        $scope.akProductOptions.akProducts = wrappedObject;
                        self.original.akProducts = $scope.akProductOptions.akProducts;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/AkProductOptions");
        };
        AkProductOptionsResource.get({AkProductOptionsId:$routeParams.AkProductOptionsId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.akProductOptions);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.akProductOptions.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/AkProductOptions");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/AkProductOptions");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.akProductOptions.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("akOptionGroupsSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.akProductOptions.akOptionGroups = {};
            $scope.akProductOptions.akOptionGroups.optionGroupId = selection.value;
        }
    });
    $scope.$watch("akOptionsSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.akProductOptions.akOptions = {};
            $scope.akProductOptions.akOptions.optionId = selection.value;
        }
    });
    $scope.$watch("akProductsSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.akProductOptions.akProducts = {};
            $scope.akProductOptions.akProducts.productId = selection.value;
        }
    });
    
    $scope.get();
});