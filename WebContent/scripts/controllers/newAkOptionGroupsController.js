
angular.module('agileRulesKart').controller('NewAkOptionGroupsController', function ($scope, $location, locationParser, AkOptionGroupsResource , AkProductOptionsResource, AkCategoryOptionsResource, AkOptionsResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.akOptionGroups = $scope.akOptionGroups || {};
    
    $scope.akProductOptionsesList = AkProductOptionsResource.queryAll(function(items){
        $scope.akProductOptionsesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.productOptionId,
                text : item.productOptionId
            });
        });
    });
    $scope.$watch("akProductOptionsesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.akOptionGroups.akProductOptionses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.productOptionId = selectedItem.value;
                $scope.akOptionGroups.akProductOptionses.push(collectionItem);
            });
        }
    });
    
    $scope.akCategoryOptionsesList = AkCategoryOptionsResource.queryAll(function(items){
        $scope.akCategoryOptionsesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.categoryOptionId,
                text : item.categoryOptionId
            });
        });
    });
    $scope.$watch("akCategoryOptionsesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.akOptionGroups.akCategoryOptionses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.categoryOptionId = selectedItem.value;
                $scope.akOptionGroups.akCategoryOptionses.push(collectionItem);
            });
        }
    });
    
    $scope.akOptionsesList = AkOptionsResource.queryAll(function(items){
        $scope.akOptionsesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.optionId,
                text : item.optionId
            });
        });
    });
    $scope.$watch("akOptionsesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.akOptionGroups.akOptionses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.optionId = selectedItem.value;
                $scope.akOptionGroups.akOptionses.push(collectionItem);
            });
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/AkOptionGroups/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        AkOptionGroupsResource.save($scope.akOptionGroups, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/AkOptionGroups");
    };
});