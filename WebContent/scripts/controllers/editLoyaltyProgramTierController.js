

angular.module('agilekartV2').controller('EditLoyaltyProgramTierController', function($scope, $routeParams, $location, LoyaltyProgramTierResource , UserRewardsResource, LoyaltyEventDetailsResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.loyaltyProgramTier = new LoyaltyProgramTierResource(self.original);
            UserRewardsResource.queryAll(function(items) {
                $scope.userRewardsesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        rewardId : item.rewardId
                    };
                    var labelObject = {
                        value : item.rewardId,
                        text : item.rewardId
                    };
                    if($scope.loyaltyProgramTier.userRewardses){
                        $.each($scope.loyaltyProgramTier.userRewardses, function(idx, element) {
                            if(item.rewardId == element.rewardId) {
                                $scope.userRewardsesSelection.push(labelObject);
                                $scope.loyaltyProgramTier.userRewardses.push(wrappedObject);
                            }
                        });
                        self.original.userRewardses = $scope.loyaltyProgramTier.userRewardses;
                    }
                    return labelObject;
                });
            });
            LoyaltyEventDetailsResource.queryAll(function(items) {
                $scope.loyaltyEventDetailsesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        loyaltyEventDetailsId : item.loyaltyEventDetailsId
                    };
                    var labelObject = {
                        value : item.loyaltyEventDetailsId,
                        text : item.loyaltyEventDetailsId
                    };
                    if($scope.loyaltyProgramTier.loyaltyEventDetailses){
                        $.each($scope.loyaltyProgramTier.loyaltyEventDetailses, function(idx, element) {
                            if(item.loyaltyEventDetailsId == element.loyaltyEventDetailsId) {
                                $scope.loyaltyEventDetailsesSelection.push(labelObject);
                                $scope.loyaltyProgramTier.loyaltyEventDetailses.push(wrappedObject);
                            }
                        });
                        self.original.loyaltyEventDetailses = $scope.loyaltyProgramTier.loyaltyEventDetailses;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/LoyaltyProgramTiers");
        };
        LoyaltyProgramTierResource.get({LoyaltyProgramTierId:$routeParams.LoyaltyProgramTierId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.loyaltyProgramTier);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.loyaltyProgramTier.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/LoyaltyProgramTiers");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/LoyaltyProgramTiers");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.loyaltyProgramTier.$remove(successCallback, errorCallback);
    };
    
    $scope.userRewardsesSelection = $scope.userRewardsesSelection || [];
    $scope.$watch("userRewardsesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.loyaltyProgramTier) {
            $scope.loyaltyProgramTier.userRewardses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.rewardId = selectedItem.value;
                $scope.loyaltyProgramTier.userRewardses.push(collectionItem);
            });
        }
    });
    $scope.loyaltyEventDetailsesSelection = $scope.loyaltyEventDetailsesSelection || [];
    $scope.$watch("loyaltyEventDetailsesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.loyaltyProgramTier) {
            $scope.loyaltyProgramTier.loyaltyEventDetailses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.loyaltyEventDetailsId = selectedItem.value;
                $scope.loyaltyProgramTier.loyaltyEventDetailses.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});