
angular.module('agilekartV2').controller('NewPaymentGatewayController', function ($scope, $location, locationParser, PaymentGatewayResource , MerchantPaymentGatewayResource, OrdersResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.paymentGateway = $scope.paymentGateway || {};
    
    $scope.merchantPaymentGatewaysList = MerchantPaymentGatewayResource.queryAll(function(items){
        $scope.merchantPaymentGatewaysSelectionList = $.map(items, function(item) {
            return ( {
                value : item.merchantPaymentGatewayId,
                text : item.merchantPaymentGatewayId
            });
        });
    });
    $scope.$watch("merchantPaymentGatewaysSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.paymentGateway.merchantPaymentGateways = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.merchantPaymentGatewayId = selectedItem.value;
                $scope.paymentGateway.merchantPaymentGateways.push(collectionItem);
            });
        }
    });
    
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
            $scope.paymentGateway.orderses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.orderId = selectedItem.value;
                $scope.paymentGateway.orderses.push(collectionItem);
            });
        }
    });
    

    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "PAYGAT"+data.maxCount;
        	console.log(data);
        	$scope.paymentGateway.paymentGatewayId = prmryKy;
        	$scope.paymentGateway.lastUpdateUserId = "ABC";
            $scope.paymentGateway.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/paymentgateways');
		    catgry.save($scope.paymentGateway, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"PAYGAT"}, successCallback, errorCallback);
    };
    
    $scope.save = function() {
    	$scope.getId();  
    };
    
    $scope.cancel = function() {
        $location.path("/PaymentGateways");
    };
});