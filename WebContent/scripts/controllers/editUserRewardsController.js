

angular.module('agilekartV2').controller('EditUserRewardsController', function($scope, $routeParams, $location, UserRewardsResource , LoyaltyProgramTierResource, OrdersResource, UsersResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.userRewards = new UserRewardsResource(self.original);
            LoyaltyProgramTierResource.queryAll(function(items) {
                $scope.loyaltyProgramTierSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        tierId : item.tierId
                    };
                    var labelObject = {
                        value : item.tierId,
                        text : item.tierId
                    };
                    if($scope.userRewards.loyaltyProgramTier && item.tierId == $scope.userRewards.loyaltyProgramTier.tierId) {
                        $scope.loyaltyProgramTierSelection = labelObject;
                        $scope.userRewards.loyaltyProgramTier = wrappedObject;
                        self.original.loyaltyProgramTier = $scope.userRewards.loyaltyProgramTier;
                    }
                    return labelObject;
                });
            });
            OrdersResource.queryAll(function(items) {
                $scope.ordersSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        orderId : item.orderId
                    };
                    var labelObject = {
                        value : item.orderId,
                        text : item.orderId
                    };
                    if($scope.userRewards.orders && item.orderId == $scope.userRewards.orders.orderId) {
                        $scope.ordersSelection = labelObject;
                        $scope.userRewards.orders = wrappedObject;
                        self.original.orders = $scope.userRewards.orders;
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
                    if($scope.userRewards.users && item.userId == $scope.userRewards.users.userId) {
                        $scope.usersSelection = labelObject;
                        $scope.userRewards.users = wrappedObject;
                        self.original.users = $scope.userRewards.users;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/UserRewards");
        };
        UserRewardsResource.get({UserRewardsId:$routeParams.UserRewardsId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.userRewards);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.userRewards.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/UserRewards");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/UserRewards");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.userRewards.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("loyaltyProgramTierSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.userRewards.loyaltyProgramTier = {};
            $scope.userRewards.loyaltyProgramTier.tierId = selection.value;
        }
    });
    $scope.$watch("ordersSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.userRewards.orders = {};
            $scope.userRewards.orders.orderId = selection.value;
        }
    });
    $scope.$watch("usersSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.userRewards.users = {};
            $scope.userRewards.users.userId = selection.value;
        }
    });
    
    $scope.get();
});