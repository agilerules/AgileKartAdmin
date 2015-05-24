
angular.module('agileRulesKart').controller('NewAkOptionsController', function ($scope, $location, locationParser, AkOptionsResource , AkOptionGroupsResource, AkProductOptionsResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.akOptions = $scope.akOptions || {};
    
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
            $scope.akOptions.akOptionGroups = {};
            $scope.akOptions.akOptionGroups.optionGroupId = selection.value;
        }
    });
    
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
            $scope.akOptions.akProductOptionses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.productOptionId = selectedItem.value;
                $scope.akOptions.akProductOptionses.push(collectionItem);
            });
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/AkOptions/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        AkOptionsResource.save($scope.akOptions, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/AkOptions");
    };
});