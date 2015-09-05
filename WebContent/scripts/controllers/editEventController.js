

angular.module('agilekartV2').controller('EditEventController', function($scope, $routeParams, $location, EventResource , LoyaltyEventDetailsResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.event = new EventResource(self.original);
            LoyaltyEventDetailsResource.queryAll(function(items) {
                $scope.loyaltyEventDetailsesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        loyaltyEventDetailsId : item.loyaltyEventDetailsId
                    };
                    var labelObject = {
                        value : item.loyaltyEventDetailsId,
                        text : item.loyaltyEventDetailsId
                    };
                    if($scope.event.loyaltyEventDetailses){
                        $.each($scope.event.loyaltyEventDetailses, function(idx, element) {
                            if(item.loyaltyEventDetailsId == element.loyaltyEventDetailsId) {
                                $scope.loyaltyEventDetailsesSelection.push(labelObject);
                                $scope.event.loyaltyEventDetailses.push(wrappedObject);
                            }
                        });
                        self.original.loyaltyEventDetailses = $scope.event.loyaltyEventDetailses;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Events");
        };
        EventResource.get({EventId:$routeParams.EventId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.event);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.event.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Events");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Events");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.event.$remove(successCallback, errorCallback);
    };
    
    $scope.loyaltyEventDetailsesSelection = $scope.loyaltyEventDetailsesSelection || [];
    $scope.$watch("loyaltyEventDetailsesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.event) {
            $scope.event.loyaltyEventDetailses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.loyaltyEventDetailsId = selectedItem.value;
                $scope.event.loyaltyEventDetailses.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});