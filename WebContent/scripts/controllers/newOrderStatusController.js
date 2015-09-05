
angular.module('agilekartV2').controller('NewOrderStatusController', function ($scope, $location, locationParser, OrderStatusResource , OrderStatusDescResource, OrdersResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.orderStatus = $scope.orderStatus || {};
    
    $scope.orderStatusDescList = OrderStatusDescResource.queryAll(function(items){
        $scope.orderStatusDescSelectionList = $.map(items, function(item) {
            return ( {
                value : item.orderStatusDescId,
                text : item.orderStatusDescText
            });
        });
    });
    $scope.$watch("orderStatusDescSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.orderStatus.orderStatusDesc = {};
            $scope.orderStatus.orderStatusDesc.orderStatusDescId = selection.value;
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
            $scope.orderStatus.orders = {};
            $scope.orderStatus.orders.orderId = selection.value;
        }
    });
    
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "ODRSTA"+data.maxCount;
        	console.log(data);
        	$scope.orderStatus.orderStatusId = prmryKy;
        	$scope.orderStatus.lastUpdateUserId = "ABC";
            $scope.orderStatus.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/orderstatuses');
		    catgry.save($scope.orderStatus, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"ODRSTA"}, successCallback, errorCallback);
    };
    
    $scope.save = function() {
    	$scope.getId();  
    };
    
    $scope.cancel = function() {
        $location.path("/OrderStatuses");
    };
});