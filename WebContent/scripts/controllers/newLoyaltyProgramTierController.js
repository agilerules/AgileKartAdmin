
angular.module('agilekartV2').controller('NewLoyaltyProgramTierController', function ($scope, $location, locationParser, LoyaltyProgramTierResource , UserRewardsResource, LoyaltyEventDetailsResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.loyaltyProgramTier = $scope.loyaltyProgramTier || {};
    
    $scope.userRewardsesList = UserRewardsResource.queryAll(function(items){
        $scope.userRewardsesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.rewardId,
                text : item.rewardName
            });
        });
    });
    $scope.$watch("userRewardsesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.loyaltyProgramTier.userRewardses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.rewardId = selectedItem.value;
                $scope.loyaltyProgramTier.userRewardses.push(collectionItem);
            });
        }
    });
    
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
            $scope.loyaltyProgramTier.loyaltyEventDetailses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.loyaltyEventDetailsId = selectedItem.value;
                $scope.loyaltyProgramTier.loyaltyEventDetailses.push(collectionItem);
            });
        }
    });
    

    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "LOYPGMTIR"+data.maxCount;
        	console.log(data);
        	$scope.loyaltyProgramTier.tierId = prmryKy;
        	$scope.loyaltyProgramTier.lastUpdateUserId = "ABC";
            $scope.loyaltyProgramTier.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/loyaltyprogramtiers');
		    catgry.save($scope.loyaltyProgramTier, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"LOYPGMTIR"}, successCallback, errorCallback);
    };
    
    $scope.save = function() { 	
    	$scope.getId();
    	};
    
    $scope.cancel = function() {
        $location.path("/LoyaltyProgramTiers");
    };
});