

angular.module('agileRulesKart').controller('EditAkUserAddressController', function($scope, $routeParams, $location, AkUserAddressResource , AkUsersResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.akUserAddress = new AkUserAddressResource(self.original);
            AkUsersResource.queryAll(function(items) {
                $scope.akUsersSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        userId : item.userId
                    };
                    var labelObject = {
                        value : item.userId,
                        text : item.userEmail
                    };
                    if($scope.akUserAddress.akUsers && item.userId == $scope.akUserAddress.akUsers.userId) {
                        $scope.akUsersSelection = labelObject;
                        $scope.akUserAddress.akUsers = wrappedObject;
                        self.original.akUsers = $scope.akUserAddress.akUsers;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/AkUserAddresses");
        };
        AkUserAddressResource.get({AkUserAddressId:$routeParams.AkUserAddressId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.akUserAddress);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.akUserAddress.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/AkUserAddresses");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/AkUserAddresses");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.akUserAddress.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("akUsersSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.akUserAddress.akUsers = {};
            $scope.akUserAddress.akUsers.userId = selection.value;
        }
    });
    
    $scope.get();
});