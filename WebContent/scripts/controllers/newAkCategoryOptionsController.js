
angular.module('agileRulesKart').controller('NewAkCategoryOptionsController', function ($scope, $location, locationParser, AkCategoryOptionsResource , AkOptionGroupsResource, AkProductCategoriesResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.akCategoryOptions = $scope.akCategoryOptions || {};
    
    $scope.akOptionGroupsList = AkOptionGroupsResource.queryAll(function(items){
        $scope.akOptionGroupsSelectionList = $.map(items, function(item) {
            return ( {
                value : item.optionGroupId,
                text : item.optionGroupId
            });
        });
    });
    $scope.$watch("akOptionGroupsSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.akCategoryOptions.akOptionGroups = {};
            $scope.akCategoryOptions.akOptionGroups.optionGroupId = selection.value;
        }
    });
    
    $scope.akProductCategoriesList = AkProductCategoriesResource.queryAll(function(items){
        $scope.akProductCategoriesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.categoryId,
                text : item.categoryId
            });
        });
    });
    $scope.$watch("akProductCategoriesSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.akCategoryOptions.akProductCategories = {};
            $scope.akCategoryOptions.akProductCategories.categoryId = selection.value;
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/AkCategoryOptions/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        AkCategoryOptionsResource.save($scope.akCategoryOptions, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/AkCategoryOptions");
    };
});