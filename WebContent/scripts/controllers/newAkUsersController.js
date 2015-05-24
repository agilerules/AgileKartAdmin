
angular.module('agileRulesKart').controller('NewAkUsersController', function ($scope, $location, locationParser, AkUsersResource , AkOrdersResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.akUsers = $scope.akUsers || {};
    
    $scope.userEmailVerifiedList = [
        "true",
        " false"
    ];
    
    $scope.akOrdersesList = AkOrdersResource.queryAll(function(items){
        $scope.akOrdersesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.orderId,
                text : item.orderId
            });
        });
    });
    $scope.$watch("akOrdersesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.akUsers.akOrderses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.orderId = selectedItem.value;
                $scope.akUsers.akOrderses.push(collectionItem);
            });
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/AkUsers/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        AkUsersResource.save($scope.akUsers, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/AkUsers");
    };
});