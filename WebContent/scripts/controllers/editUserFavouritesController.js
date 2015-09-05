

angular.module('agilekartV2').controller('EditUserFavouritesController', function($scope, $routeParams, $location, UserFavouritesResource , MerchantResource, UsersResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.userFavourites = new UserFavouritesResource(self.original);
            MerchantResource.queryAll(function(items) {
                $scope.merchantSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        merchantId : item.merchantId
                    };
                    var labelObject = {
                        value : item.merchantId,
                        text : item.merchantId
                    };
                    if($scope.userFavourites.merchant && item.merchantId == $scope.userFavourites.merchant.merchantId) {
                        $scope.merchantSelection = labelObject;
                        $scope.userFavourites.merchant = wrappedObject;
                        self.original.merchant = $scope.userFavourites.merchant;
                    }
                    return labelObject;
                });
            });
            UsersResource.queryAll(function(items) {
                $scope.usersSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        userId : item.userId
                    };
                    var labelObject = {
                        value : item.userId,
                        text : item.userId
                    };
                    if($scope.userFavourites.users && item.userId == $scope.userFavourites.users.userId) {
                        $scope.usersSelection = labelObject;
                        $scope.userFavourites.users = wrappedObject;
                        self.original.users = $scope.userFavourites.users;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/UserFavourites");
        };
        UserFavouritesResource.get({UserFavouritesId:$routeParams.UserFavouritesId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.userFavourites);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.userFavourites.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/UserFavourites");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/UserFavourites");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.userFavourites.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("merchantSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.userFavourites.merchant = {};
            $scope.userFavourites.merchant.merchantId = selection.value;
        }
    });
    $scope.$watch("usersSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.userFavourites.users = {};
            $scope.userFavourites.users.userId = selection.value;
        }
    });
    
    $scope.get();
});