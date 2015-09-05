
angular.module('agilekartV2').controller('NewEventController', function ($scope, $location, locationParser, EventResource , LoyaltyEventDetailsResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.event = $scope.event || {};
    
    $scope.loyaltyEventDetailsesList = LoyaltyEventDetailsResource.queryAll(function(items){
        $scope.loyaltyEventDetailsesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.loyaltyEventDetailsId,
                text : item.loyaltyEventDetailsId
            });
        });
    });
    $scope.$watch("loyaltyEventDetailsesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.event.loyaltyEventDetailses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.loyaltyEventDetailsId = selectedItem.value;
                $scope.event.loyaltyEventDetailses.push(collectionItem);
            });
        }
    });
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "EVT"+data.maxCount;
        	$scope.event.eventId = prmryKy;
        	$scope.event.lastUpdateUserId = "ABC";
            $scope.event.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/events');
		    catgry.save($scope.event, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"EVT"}, successCallback, errorCallback);
    };

    
    
    $scope.save = function() {
    	
    	$scope.getId();
    	
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Events/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        EventResource.save($scope.event, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Events");
    };
});