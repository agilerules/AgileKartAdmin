
angular.module('agilekartV2').controller('NewMerchantAddressController', function ($scope, $location, locationParser, MerchantAddressResource , MerchantResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.merchantAddress = $scope.merchantAddress || {};
    
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
            $scope.merchantAddress.merchant = {};
            $scope.merchantAddress.merchant.merchantId = selection.value;
        }
    });
    
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "MERADR"+data.maxCount;
        	console.log(data);
        	$scope.merchantAddress.merchantAddressId = prmryKy;
        	$scope.merchantAddress.lastUpdateUserId = "ABC";
            $scope.merchantAddress.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/merchantaddresses');
		    catgry.save($scope.merchantAddress, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"MERADR"}, successCallback, errorCallback);
    };
    

    $scope.save = function() {
    	$scope.getId();
    };
    
    $scope.cancel = function() {
        $location.path("/MerchantAddresses");
    };
});