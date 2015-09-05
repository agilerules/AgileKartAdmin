
angular.module('agilekartV2').controller('NewTaxRuleMerchantController', function ($scope, $location, locationParser, TaxRuleMerchantResource , MerchantResource, TaxRuleResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.taxRuleMerchant = $scope.taxRuleMerchant || {};
    
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
            $scope.taxRuleMerchant.merchant = {};
            $scope.taxRuleMerchant.merchant.merchantId = selection.value;
        }
    });
    
    $scope.taxRuleList = TaxRuleResource.queryAll(function(items){
        $scope.taxRuleSelectionList = $.map(items, function(item) {
            return ( {
                value : item.taxRuleId,
                text : item.taxRuleName
            });
        });
    });
    $scope.$watch("taxRuleSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.taxRuleMerchant.taxRule = {};
            $scope.taxRuleMerchant.taxRule.taxRuleId = selection.value;
        }
    });
    
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "TAXMER"+data.maxCount;
        	console.log(data);
        	$scope.taxRuleMerchant.taxRuleMerchantId = prmryKy;
        	$scope.taxRuleMerchant.lastUpdateUserId = "ABC";
            $scope.taxRuleMerchant.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/taxrulemerchants');
		    catgry.save($scope.taxRuleMerchant, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"TAXMER"}, successCallback, errorCallback);
    };

    $scope.save = function() {
    	$scope.getId();  
    };
    
    $scope.cancel = function() {
        $location.path("/TaxRuleMerchants");
    };
});