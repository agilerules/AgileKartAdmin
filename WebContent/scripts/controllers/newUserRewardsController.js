
angular.module('agilekartV2').controller('NewUserRewardsController', function ($scope, $location, locationParser, UserRewardsResource , LoyaltyProgramTierResource, OrdersResource, UsersResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.userRewards = $scope.userRewards || {};
    
    $scope.loyaltyProgramTierList = LoyaltyProgramTierResource.queryAll(function(items){
        $scope.loyaltyProgramTierSelectionList = $.map(items, function(item) {
            return ( {
                value : item.tierId,
                text : item.tierId
            });
        });
    });
    $scope.$watch("loyaltyProgramTierSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.userRewards.loyaltyProgramTier = {};
            $scope.userRewards.loyaltyProgramTier.tierId = selection.value;
        }
    });
    
    $scope.ordersList = OrdersResource.queryAll(function(items){
        $scope.ordersSelectionList = $.map(items, function(item) {
            return ( {
                value : item.orderId,
                text : item.orderId
            });
        });
    });
    $scope.$watch("ordersSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.userRewards.orders = {};
            $scope.userRewards.orders.orderId = selection.value;
        }
    });
    
    $scope.usersList = UsersResource.queryAll(function(items){
        $scope.usersSelectionList = $.map(items, function(item) {
            return ( {
                value : item.userId,
                text : item.userId
            });
        });
    });
    $scope.$watch("usersSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.userRewards.users = {};
            $scope.userRewards.users.userId = selection.value;
        }
    });
    
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "USRRWD"+data.maxCount;
        	console.log(data);
        	$scope.userRewards.rewardId = prmryKy;
        	$scope.userRewards.lastUpdateUserId = "ABC";
            $scope.userRewards.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/userrewards');
		    catgry.save($scope.category, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"USRRWD"}, successCallback, errorCallback);
    };

    $scope.save = function() {
    	$scope.getId();  
    };
    
    $scope.cancel = function() {
        $location.path("/UserRewards");
    };
});