
angular.module('agileRulesKart').controller('NewAkOptionGroupsController', function ($scope, $location, locationParser, AkOptionGroupsResource , AkProductOptionsResource, AkOptionsResource) {
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