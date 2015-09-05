
angular.module('agilekartV2').controller('NewUsersController', function ($scope, $location, locationParser, UsersResource , OrdersResource, ProductReviewResource, UserRewardsResource, UserAddressResource, UserFavouritesResource, MerchantReviewResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.users = $scope.users || {};
    
    $scope.userEmailVerifiedList = [
        "true",
        " false"
    ];
    
    $scope.ordersesList = OrdersResource.queryAll(function(items){
        $scope.ordersesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.orderId,
                text : item.orderId
            });
        });
    });
    $scope.$watch("ordersesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.users.orderses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.orderId = selectedItem.value;
                $scope.users.orderses.push(collectionItem);
            });
        }
    });
    
    $scope.productReviewsList = ProductReviewResource.queryAll(function(items){
        $scope.productReviewsSelectionList = $.map(items, function(item) {
            return ( {
                value : item.productReviewId,
                text : item.productReviewId
            });
        });
    });
    $scope.$watch("productReviewsSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.users.productReviews = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.productReviewId = selectedItem.value;
                $scope.users.productReviews.push(collectionItem);
            });
        }
    });
    
    $scope.userRewardsesList = UserRewardsResource.queryAll(function(items){
        $scope.userRewardsesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.rewardId,
                text : item.rewardId
            });
        });
    });
    $scope.$watch("userRewardsesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.users.userRewardses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.rewardId = selectedItem.value;
                $scope.users.userRewardses.push(collectionItem);
            });
        }
    });
    
    $scope.userAddressesList = UserAddressResource.queryAll(function(items){
        $scope.userAddressesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.addressId,
                text : item.addressId
            });
        });
    });
    $scope.$watch("userAddressesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.users.userAddresses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.addressId = selectedItem.value;
                $scope.users.userAddresses.push(collectionItem);
            });
        }
    });
    
    $scope.userFavouritesesList = UserFavouritesResource.queryAll(function(items){
        $scope.userFavouritesesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.userFavouriteId,
                text : item.userFavouriteId
            });
        });
    });
    $scope.$watch("userFavouritesesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.users.userFavouriteses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.userFavouriteId = selectedItem.value;
                $scope.users.userFavouriteses.push(collectionItem);
            });
        }
    });
    
    $scope.merchantReviewsList = MerchantReviewResource.queryAll(function(items){
        $scope.merchantReviewsSelectionList = $.map(items, function(item) {
            return ( {
                value : item.merchantReviewId,
                text : item.merchantReviewId
            });
        });
    });
    $scope.$watch("merchantReviewsSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.users.merchantReviews = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.merchantReviewId = selectedItem.value;
                $scope.users.merchantReviews.push(collectionItem);
            });
        }
    });
    
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "USR"+data.maxCount;
        	console.log(data);
        	$scope.users.userId = prmryKy;
        	$scope.users.lastUpdateUserId = "ABC";
            $scope.users.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/users');
		    catgry.save($scope.category, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"USR"}, successCallback, errorCallback);
    };

    $scope.save = function() {
    	$scope.getId();  
    };
    
    $scope.cancel = function() {
        $location.path("/Users");
    };
});