

angular.module('agilekartV2').controller('EditLoyaltyEventDetailsController', function($scope, $routeParams, $location, LoyaltyEventDetailsResource , EventResource, LoyaltyProgramTierResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.loyaltyEventDetails = new LoyaltyEventDetailsResource(self.original);
            EventResource.queryAll(function(items) {
                $scope.eventSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        eventId : item.eventId
                    };
                    var labelObject = {
                        value : item.eventId,
                        text : item.eventName
                    };
                    if($scope.loyaltyEventDetails.event && item.eventId == $scope.loyaltyEventDetails.event.eventId) {
                        $scope.eventSelection = labelObject;
                        $scope.loyaltyEventDetails.event = wrappedObject;
                        self.original.event = $scope.loyaltyEventDetails.event;
                    }
                    return labelObject;
                });
            });
            LoyaltyProgramTierResource.queryAll(function(items) {
                $scope.loyaltyProgramTierSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        tierId : item.tierId
                    };
                    var labelObject = {
                        value : item.tierId,
                        text : item.tierName
                    };
                    if($scope.loyaltyEventDetails.loyaltyProgramTier && item.tierId == $scope.loyaltyEventDetails.loyaltyProgramTier.tierId) {
                        $scope.loyaltyProgramTierSelection = labelObject;
                        $scope.loyaltyEventDetails.loyaltyProgramTier = wrappedObject;
                        self.original.loyaltyProgramTier = $scope.loyaltyEventDetails.loyaltyProgramTier;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/LoyaltyEventDetails");
        };
        LoyaltyEventDetailsResource.get({LoyaltyEventDetailsId:$routeParams.LoyaltyEventDetailsId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.loyaltyEventDetails);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.loyaltyEventDetails.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/LoyaltyEventDetails");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/LoyaltyEventDetails");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.loyaltyEventDetails.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("eventSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.loyaltyEventDetails.event = {};
            $scope.loyaltyEventDetails.event.eventId = selection.value;
        }
    });
    $scope.$watch("loyaltyProgramTierSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.loyaltyEventDetails.loyaltyProgramTier = {};
            $scope.loyaltyEventDetails.loyaltyProgramTier.tierId = selection.value;
        }
    });
    
    $scope.get();
});