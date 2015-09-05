

angular.module('agilekartV2').controller('EditOptionsController', function($scope, $routeParams, $location, OptionsResource , OptionGroupsResource, ProductOptionResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.options = new OptionsResource(self.original);
            OptionGroupsResource.queryAll(function(items) {
                $scope.optionGroupsSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        optionGroupId : item.optionGroupId
                    };
                    var labelObject = {
                        value : item.optionGroupId,
                        text : item.optionGroupName
                    };
                    if($scope.options.optionGroups && item.optionGroupId == $scope.options.optionGroups.optionGroupId) {
                        $scope.optionGroupsSelection = labelObject;
                        $scope.options.optionGroups = wrappedObject;
                        self.original.optionGroups = $scope.options.optionGroups;
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
                    if($scope.options.productOptions){
                        $.each($scope.options.productOptions, function(idx, element) {
                            if(item.productOptionId == element.productOptionId) {
                                $scope.productOptionsSelection.push(labelObject);
                                $scope.options.productOptions.push(wrappedObject);
                            }
                        });
                        self.original.productOptions = $scope.options.productOptions;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Options");
        };
        OptionsResource.get({OptionsId:$routeParams.OptionsId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.options);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.options.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Options");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Options");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.options.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("optionGroupsSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.options.optionGroups = {};
            $scope.options.optionGroups.optionGroupId = selection.value;
        }
    });
    $scope.productOptionsSelection = $scope.productOptionsSelection || [];
    $scope.$watch("productOptionsSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.options) {
            $scope.options.productOptions = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.productOptionId = selectedItem.value;
                $scope.options.productOptions.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});