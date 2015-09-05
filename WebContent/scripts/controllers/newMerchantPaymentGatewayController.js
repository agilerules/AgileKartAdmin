
angular.module('agilekartV2').controller('NewMerchantPaymentGatewayController', function ($scope, $location, locationParser, MerchantPaymentGatewayResource , MerchantResource, PaymentGatewayResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.merchantPaymentGateway = $scope.merchantPaymentGateway || {};
    
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
            $scope.merchantPaymentGateway.merchant = {};
            $scope.merchantPaymentGateway.merchant.merchantId = selection.value;
        }
    });
    
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
            $scope.merchantPaymentGateway.paymentGateway = {};
            $scope.merchantPaymentGateway.paymentGateway.paymentGatewayId = selection.value;
        }
    });
    

    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "MERPAYGAT"+data.maxCount;
        	console.log(data);
        	$scope.merchantPaymentGateway.merchantPaymentGatewayId = prmryKy;
        	$scope.merchantPaymentGateway.lastUpdateUserId = "ABC";
            $scope.merchantPaymentGateway.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/merchantpaymentgateways');
		    catgry.save($scope.merchantPaymentGateway, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"MERPAYGAT"}, successCallback, errorCallback);
    };
    
    $scope.save = function() {
     	$scope.getId();   
    };
    
    $scope.cancel = function() {
        $location.path("/MerchantPaymentGateways");
    };
});