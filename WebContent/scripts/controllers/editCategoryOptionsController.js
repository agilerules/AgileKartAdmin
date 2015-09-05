

angular.module('agilekartV2').controller('EditCategoryOptionsController', function($scope, $routeParams, $location, CategoryOptionsResource , CategoryResource, OptionGroupsResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.categoryOptions = new CategoryOptionsResource(self.original);
            CategoryResource.queryAll(function(items) {
                $scope.categorySelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        categoryId : item.categoryId
                    };
                    var labelObject = {
                        value : item.categoryId,
                        text : item.categoryName
                    };
                    if($scope.categoryOptions.category && item.categoryId == $scope.categoryOptions.category.categoryId) {
                        $scope.categorySelection = labelObject;
                        $scope.categoryOptions.category = wrappedObject;
                        self.original.category = $scope.categoryOptions.category;
                    }
                    return labelObject;
                });
            });
            OptionGroupsResource.queryAll(function(items) {
                $scope.optionGroupsSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        optionGroupId : item.optionGroupId
                    };
                    var labelObject = {
                        value : item.optionGroupId,
                        text : item.optionGroupName
                    };
                    if($scope.categoryOptions.optionGroups && item.optionGroupId == $scope.categoryOptions.optionGroups.optionGroupId) {
                        $scope.optionGroupsSelection = labelObject;
                        $scope.categoryOptions.optionGroups = wrappedObject;
                        self.original.optionGroups = $scope.categoryOptions.optionGroups;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/CategoryOptions");
        };
        CategoryOptionsResource.get({CategoryOptionsId:$routeParams.CategoryOptionsId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.categoryOptions);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.categoryOptions.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/CategoryOptions");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/CategoryOptions");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.categoryOptions.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("categorySelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.categoryOptions.category = {};
            $scope.categoryOptions.category.categoryId = selection.value;
        }
    });
    $scope.$watch("optionGroupsSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.categoryOptions.optionGroups = {};
            $scope.categoryOptions.optionGroups.optionGroupId = selection.value;
        }
    });
    
    $scope.get();
});