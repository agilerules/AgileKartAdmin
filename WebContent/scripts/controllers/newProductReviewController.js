
angular.module('agilekartV2').controller('NewProductReviewController', function ($scope, $location, locationParser, ProductReviewResource , ProductResource, UsersResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.productReview = $scope.productReview || {};
    
    $scope.productList = ProductResource.queryAll(function(items){
        $scope.productSelectionList = $.map(items, function(item) {
            return ( {
                value : item.productId,
                text : item.productName
            });
        });
    });
    $scope.$watch("productSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.productReview.product = {};
            $scope.productReview.product.productId = selection.value;
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
            $scope.productReview.users = {};
            $scope.productReview.users.userId = selection.value;
        }
    });
    
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "PDTRVW"+data.maxCount;
        	console.log(data);
        	$scope.productReview.productReviewId = prmryKy;
        	$scope.productReview.lastUpdateUserId = "ABC";
            $scope.productReview.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/productreviews');
		    catgry.save($scope.productReview, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"PDTRVW"}, successCallback, errorCallback);
    };

    $scope.save = function() {
    	$scope.getId();  
    };
    
    $scope.cancel = function() {
        $location.path("/ProductReviews");
    };
});