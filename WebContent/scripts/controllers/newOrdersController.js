
angular.module('agilekartV2').controller('NewOrdersController', function ($scope, $location, locationParser, OrdersResource , PaymentGatewayResource, UsersResource, OrderStatusResource, OrderDetailsResource, UserRewardsResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.orders = $scope.orders || {};
    
    $scope.paymentGatewayList = PaymentGatewayResource.queryAll(function(items){
        $scope.paymentGatewaySelectionList = $.map(items, function(item) {
            return ( {
                value : item.paymentGatewayId,
                text : item.paymentGatewayName
            });
        });
    });
    $scope.$watch("paymentGatewaySelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.orders.paymentGateway = {};
            $scope.orders.paymentGateway.paymentGatewayId = selection.value;
        }
    });
    
    $scope.usersList = UsersResource.queryAll(function(items){
        $scope.usersSelectionList = $.map(items, function(item) {
            return ( {
                value : item.userId,
                text : item.userName
            });
        });
    });
    $scope.$watch("usersSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.orders.users = {};
            $scope.orders.users.userId = selection.value;
        }
    });
    
    $scope.orderStatusesList = OrderStatusResource.queryAll(function(items){
        $scope.orderStatusesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.orderStatusId,
                text : item.orderStatusName
            });
        });
    });
    $scope.$watch("orderStatusesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.orders.orderStatuses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.orderStatusId = selectedItem.value;
                $scope.orders.orderStatuses.push(collectionItem);
            });
        }
    });
    
    $scope.orderDetailsesList = OrderDetailsResource.queryAll(function(items){
        $scope.orderDetailsesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.detailId,
                text : item.detailName
            });
        });
    });
    $scope.$watch("orderDetailsesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.orders.orderDetailses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.detailId = selectedItem.value;
                $scope.orders.orderDetailses.push(collectionItem);
            });
        }
    });
    
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
            $scope.orders.userRewardses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.rewardId = selectedItem.value;
                $scope.orders.userRewardses.push(collectionItem);
            });
        }
    });
    
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "ODR"+data.maxCount;
        	console.log(data);
        	$scope.orders.orderId = prmryKy;
        	$scope.orders.lastUpdateUserId = "ABC";
            $scope.orders.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/orders');
		    catgry.save($scope.orders, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"ODR"}, successCallback, errorCallback);
    };

    $scope.save = function() {
    	$scope.getId(); 
    };
    
    $scope.cancel = function() {
        $location.path("/Orders");
    };
});