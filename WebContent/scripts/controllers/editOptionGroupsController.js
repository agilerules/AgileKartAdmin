

angular.module('agilekartV2').controller('EditOptionGroupsController', function($scope, $routeParams, $location, OptionGroupsResource , OptionsResource, CategoryOptionsResource, ProductOptionResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.optionGroups = new OptionGroupsResource(self.original);
            OptionsResource.queryAll(function(items) {
                $scope.optionsesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        optionId : item.optionId
                    };
                    var labelObject = {
                        value : item.optionId,
                        text : item.optionName
                    };
                    if($scope.optionGroups.optionses){
                        $.each($scope.optionGroups.optionses, function(idx, element) {
                            if(item.optionId == element.optionId) {
                                $scope.optionsesSelection.push(labelObject);
                                $scope.optionGroups.optionses.push(wrappedObject);
                            }
                        });
                        self.original.optionses = $scope.optionGroups.optionses;
                    }
                    return labelObject;
                });
            });
            CategoryOptionsResource.queryAll(function(items) {
                $scope.categoryOptionsesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        categoryOptionsId : item.categoryOptionsId
                    };
                    var labelObject = {
                        value : item.categoryOptionsId,
                        text : item.categoryOptionsName
                    };
                    if($scope.optionGroups.categoryOptionses){
                        $.each($scope.optionGroups.categoryOptionses, function(idx, element) {
                            if(item.categoryOptionsId == element.categoryOptionsId) {
                                $scope.categoryOptionsesSelection.push(labelObject);
                                $scope.optionGroups.categoryOptionses.push(wrappedObject);
                            }
                        });
                        self.original.categoryOptionses = $scope.optionGroups.categoryOptionses;
                    }
                    return labelObject;
                });
            });
            ProductOptionResource.queryAll(function(items) {
                $scope.productOptionsSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        productOptionId : item.productOptionId
                    };
                    var labelObject = {
                        value : item.productOptionId,
                        text : item.productOptionName
                    };
                    if($scope.optionGroups.productOptions){
                        $.each($scope.optionGroups.productOptions, function(idx, element) {
                            if(item.productOptionId == element.productOptionId) {
                                $scope.productOptionsSelection.push(labelObject);
                                $scope.optionGroups.productOptions.push(wrappedObject);
                            }
                        });
                        self.original.productOptions = $scope.optionGroups.productOptions;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/OptionGroups");
        };
        OptionGroupsResource.get({OptionGroupsId:$routeParams.OptionGroupsId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.optionGroups);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.optionGroups.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/OptionGroups");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/OptionGroups");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.optionGroups.$remove(successCallback, errorCallback);
    };
    
    $scope.optionsesSelection = $scope.optionsesSelection || [];
    $scope.$watch("optionsesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.optionGroups) {
            $scope.optionGroups.optionses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.optionId = selectedItem.value;
                $scope.optionGroups.optionses.push(collectionItem);
            });
        }
    });
    $scope.categoryOptionsesSelection = $scope.categoryOptionsesSelection || [];
    $scope.$watch("categoryOptionsesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.optionGroups) {
            $scope.optionGroups.categoryOptionses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.categoryOptionsId = selectedItem.value;
                $scope.optionGroups.categoryOptionses.push(collectionItem);
            });
        }
    });
    $scope.productOptionsSelection = $scope.productOptionsSelection || [];
    $scope.$watch("productOptionsSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.optionGroups) {
            $scope.optionGroups.productOptions = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.productOptionId = selectedItem.value;
                $scope.optionGroups.productOptions.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});