

angular.module('agileRulesKart').controller('EditAkCategoryOptionsController', function($scope, $routeParams, $location, AkCategoryOptionsResource , AkOptionGroupsResource, AkProductCategoriesResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.akCategoryOptions = new AkCategoryOptionsResource(self.original);
            AkOptionGroupsResource.queryAll(function(items) {
                $scope.akOptionGroupsSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        optionGroupId : item.optionGroupId
                    };
                    var labelObject = {
                        value : item.optionGroupId,
                        text : item.optionGroupId
                    };
                    if($scope.akCategoryOptions.akOptionGroups && item.optionGroupId == $scope.akCategoryOptions.akOptionGroups.optionGroupId) {
                        $scope.akOptionGroupsSelection = labelObject;
                        $scope.akCategoryOptions.akOptionGroups = wrappedObject;
                        self.original.akOptionGroups = $scope.akCategoryOptions.akOptionGroups;
                    }
                    return labelObject;
                });
            });
            AkProductCategoriesResource.queryAll(function(items) {
                $scope.akProductCategoriesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        categoryId : item.categoryId
                    };
                    var labelObject = {
                        value : item.categoryId,
                        text : item.categoryId
                    };
                    if($scope.akCategoryOptions.akProductCategories && item.categoryId == $scope.akCategoryOptions.akProductCategories.categoryId) {
                        $scope.akProductCategoriesSelection = labelObject;
                        $scope.akCategoryOptions.akProductCategories = wrappedObject;
                        self.original.akProductCategories = $scope.akCategoryOptions.akProductCategories;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/AkCategoryOptions");
        };
        AkCategoryOptionsResource.get({AkCategoryOptionsId:$routeParams.AkCategoryOptionsId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.akCategoryOptions);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.akCategoryOptions.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/AkCategoryOptions");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/AkCategoryOptions");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.akCategoryOptions.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("akOptionGroupsSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.akCategoryOptions.akOptionGroups = {};
            $scope.akCategoryOptions.akOptionGroups.optionGroupId = selection.value;
        }
    });
    $scope.$watch("akProductCategoriesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.akCategoryOptions.akProductCategories = {};
            $scope.akCategoryOptions.akProductCategories.categoryId = selection.value;
        }
    });
    
    $scope.get();
});