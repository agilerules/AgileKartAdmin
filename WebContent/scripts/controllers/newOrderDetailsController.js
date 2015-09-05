
angular.module('agilekartV2').controller('NewOrderDetailsController', function ($scope, $location, locationParser, OrderDetailsResource , OrdersResource, ProductResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.orderDetails = $scope.orderDetails || {};
    
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
            $scope.orderDetails.orders = {};
            $scope.orderDetails.orders.orderId = selection.value;
        }
    });
    
    $scope.productList = ProductResource.queryAll(function(items){
        $scope.productSelectionList = $.map(items, function(item) {
            return ( {
                value : item.productId,
                text : item.productId
            });
        });
    });
    $scope.$watch("productSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.orderDetails.product = {};
            $scope.orderDetails.product.productId = selection.value;
        }
    });
    
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "ODRDET"+data.maxCount;
        	console.log(data);
        	$scope.orderDetails.detailId = prmryKy;
        	$scope.orderDetails.lastUpdateUserId = "ABC";
            $scope.orderDetails.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/orderdetails');
		    catgry.save($scope.category, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"ODRDET"}, successCallback, errorCallback);
    };

    $scope.save = function() {
    	$scope.getId();  
    };
    
    $scope.cancel = function() {
        $location.path("/OrderDetails");
    };
});