

angular.module('agilekartV2').controller('EditUserAddressController', function($scope, $routeParams, $location, UserAddressResource , UsersResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.userAddress = new UserAddressResource(self.original);
            UsersResource.queryAll(function(items) {
                $scope.usersSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        userId : item.userId
                    };
                    var labelObject = {
                        value : item.userId,
                        text : item.userId
                    };
                    if($scope.userAddress.users && item.userId == $scope.userAddress.users.userId) {
                        $scope.usersSelection = labelObject;
                        $scope.userAddress.users = wrappedObject;
                        self.original.users = $scope.userAddress.users;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/UserAddresses");
        };
        UserAddressResource.get({UserAddressId:$routeParams.UserAddressId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.userAddress);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.userAddress.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/UserAddresses");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/UserAddresses");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.userAddress.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("usersSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.userAddress.users = {};
            $scope.userAddress.users.userId = selection.value;
        }
    });
    
    $scope.get();
});