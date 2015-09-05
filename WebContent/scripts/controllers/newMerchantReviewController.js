
angular.module('agilekartV2').controller('NewMerchantReviewController', function ($scope, $location, locationParser, MerchantReviewResource , MerchantResource, UsersResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.merchantReview = $scope.merchantReview || {};
    
    $scope.merchantList = MerchantResource.queryAll(function(items){
        $scope.merchantSelectionList = $.map(items, function(item) {
            return ( {
                value : item.merchantId,
                text : item.merchantName
            });
        });
    });
    $scope.$watch("merchantSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.merchantReview.merchant = {};
            $scope.merchantReview.merchant.merchantId = selection.value;
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
            $scope.merchantReview.users = {};
            $scope.merchantReview.users.userId = selection.value;
        }
    });
    
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "MERREV"+data.maxCount;
        	console.log(data);
        	$scope.merchantReview.merchantReviewId = prmryKy;
        	$scope.merchantReview.lastUpdateUserId = "ABC";
            $scope.merchantReview.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/merchantreviews');
		    catgry.save($scope.merchantReview, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"MERREV"}, successCallback, errorCallback);
    };

    $scope.save = function() {
     	$scope.getId();   
    };
    
    $scope.cancel = function() {
        $location.path("/MerchantReviews");
    };
});