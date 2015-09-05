
angular.module('agilekartV2').controller('NewLoyaltyProgramMerchantController', function ($scope, $location, locationParser, LoyaltyProgramMerchantResource , MerchantResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.loyaltyProgramMerchant = $scope.loyaltyProgramMerchant || {};
    
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
            $scope.loyaltyProgramMerchant.merchant = {};
            $scope.loyaltyProgramMerchant.merchant.merchantId = selection.value;
        }
    });

    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "LOYPGMMER"+data.maxCount;
        	console.log(data);
        	$scope.loyaltyProgramMerchant.loyaltyProgramMerchantId = prmryKy;
        	$scope.loyaltyProgramMerchant.lastUpdateUserId = "ABC";
            $scope.loyaltyProgramMerchant.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/loyaltyprogrammerchants');
		    catgry.save($scope.loyaltyProgramMerchant, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"LOYPGMMER"}, successCallback, errorCallback);
    };

    $scope.save = function() {
    	$scope.getId();
           };
    
    $scope.cancel = function() {
        $location.path("/LoyaltyProgramMerchants");
    };
});