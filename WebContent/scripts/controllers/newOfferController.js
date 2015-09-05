
angular.module('agilekartV2').controller('NewOfferController', function ($scope, $location, locationParser, OfferResource , MerchantResource, ProductResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.offer = $scope.offer || {};
    
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
            $scope.offer.merchant = {};
            $scope.offer.merchant.merchantId = selection.value;
        }
    });
    
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
            $scope.offer.product = {};
            $scope.offer.product.productId = selection.value;
        }
    });
    
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "OFR"+data.maxCount;
        	console.log(data);
        	$scope.offer.offerId = prmryKy;
        	$scope.offer.lastUpdateUserId = "ABC";
            $scope.offer.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/offers');
		    catgry.save($scope.offer, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"OFR"}, successCallback, errorCallback);
    };

    $scope.save = function() {
    	$scope.getId();  
    };
    
    $scope.cancel = function() {
        $location.path("/Offers");
    };
});