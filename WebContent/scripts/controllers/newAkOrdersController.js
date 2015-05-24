
angular.module('agileRulesKart').controller('NewAkOrdersController', function ($scope, $location, locationParser, AkOrdersResource , AkUsersResource, AkOrderDetailsResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.akOrders = $scope.akOrders || {};
    
    $scope.akUsersList = AkUsersResource.queryAll(function(items){
        $scope.akUsersSelectionList = $.map(items, function(item) {
            return ( {
                value : item.userId,
                text : item.userId
            });
        });
    });
    $scope.$watch("akUsersSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.akOrders.akUsers = {};
            $scope.akOrders.akUsers.userId = selection.value;
        }
    });
    
    $scope.akOrderDetailsesList = AkOrderDetailsResource.queryAll(function(items){
        $scope.akOrderDetailsesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.detailId,
                text : item.detailId
            });
        });
    });
    $scope.$watch("akOrderDetailsesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.akOrders.akOrderDetailses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.detailId = selectedItem.value;
                $scope.akOrders.akOrderDetailses.push(collectionItem);
            });
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/AkOrders/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        AkOrdersResource.save($scope.akOrders, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/AkOrders");
    };
});