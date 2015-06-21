
angular.module('agileRulesKart').controller('NewAkUserAddressController', function ($scope, $location, locationParser, AkUserAddressResource , AkUsersResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.akUserAddress = $scope.akUserAddress || {};
    
    $scope.akUsersList = AkUsersResource.queryAll(function(items){
        $scope.akUsersSelectionList = $.map(items, function(item) {
            return ( {
                value : item.userId,
                text : item.userEmail
            });
        });
    });
    $scope.$watch("akUsersSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.akUserAddress.akUsers = {};
            $scope.akUserAddress.akUsers.userId = selection.value;
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/AkUserAddresses/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        AkUserAddressResource.save($scope.akUserAddress, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/AkUserAddresses");
    };
});