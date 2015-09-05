
angular.module('agilekartV2').controller('NewLoyaltyEventDetailsController', function ($scope, $location, locationParser, LoyaltyEventDetailsResource , EventResource, LoyaltyProgramTierResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.loyaltyEventDetails = $scope.loyaltyEventDetails || {};
    
    $scope.eventList = EventResource.queryAll(function(items){
        $scope.eventSelectionList = $.map(items, function(item) {
            return ( {
                value : item.eventId,
                text : item.eventName
            });
        });
    });
    $scope.$watch("eventSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.loyaltyEventDetails.event = {};
            $scope.loyaltyEventDetails.event.eventId = selection.value;
        }
    });
    
    $scope.loyaltyProgramTierList = LoyaltyProgramTierResource.queryAll(function(items){
        $scope.loyaltyProgramTierSelectionList = $.map(items, function(item) {
            return ( {
                value : item.tierId,
                text : item.tierName
            });
        });
    });
    $scope.$watch("loyaltyProgramTierSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.loyaltyEventDetails.loyaltyProgramTier = {};
            $scope.loyaltyEventDetails.loyaltyProgramTier.tierId = selection.value;
        }
    });
    

    $scope.save = function() {
    	$scope.getId();
    };
    
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "LOYEVT"+data.maxCount;
        	console.log(data);
        	$scope.loyaltyEventDetails.loyaltyEventDetailsId = prmryKy;
        	$scope.loyaltyEventDetails.lastUpdateUserId = "ABC";
            $scope.loyaltyEventDetails.lastUpdateTs = new Date();
        	var successCallback1 = function(data,responseHeaders){
        		console.log($scope.sequenceKeyTable.maxCount);
        		$scope.sequenceKeyTable.maxCount = $scope.sequenceKeyTable.maxCount + 1;
        		console.log($scope.sequenceKeyTable.maxCount);
        		var successCallback2 = function(){
                    $scope.displayError = false;
                };
                var errorCallback2 = function() {
                    $scope.displayError=true;
                };
        		$scope.sequenceKeyTable.$update(successCallback2, errorCallback2);
        		$scope.displayError = false;
            };
            var errorCallback1 = function() {
                $scope.displayError = true;
            };
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/loyaltyeventdetails');
		    catgry.save($scope.loyaltyEventDetails, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"LOYEVT"}, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/LoyaltyEventDetails");
    };
});