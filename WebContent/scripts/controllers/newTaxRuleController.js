
angular.module('agilekartV2').controller('NewTaxRuleController', function ($scope, $location, locationParser, TaxRuleResource , TaxResource, TaxRuleMerchantResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.taxRule = $scope.taxRule || {};
    
    $scope.taxList = TaxResource.queryAll(function(items){
        $scope.taxSelectionList = $.map(items, function(item) {
            return ( {
                value : item.taxId,
                text : item.taxId
            });
        });
    });
    $scope.$watch("taxSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.taxRule.tax = {};
            $scope.taxRule.tax.taxId = selection.value;
        }
    });
    
    $scope.taxRuleMerchantsList = TaxRuleMerchantResource.queryAll(function(items){
        $scope.taxRuleMerchantsSelectionList = $.map(items, function(item) {
            return ( {
                value : item.taxRuleMerchantId,
                text : item.taxRuleMerchantId
            });
        });
    });
    $scope.$watch("taxRuleMerchantsSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.taxRule.taxRuleMerchants = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.taxRuleMerchantId = selectedItem.value;
                $scope.taxRule.taxRuleMerchants.push(collectionItem);
            });
        }
    });
    
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "TAXRUL"+data.maxCount;
        	console.log(data);
        	$scope.taxRule.taxRuleId = prmryKy;
        	$scope.taxRule.lastUpdateUserId = "ABC";
            $scope.taxRule.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/taxrules');
		    catgry.save($scope.category, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"TAXRUL"}, successCallback, errorCallback);
    };

    $scope.save = function() {
    	$scope.getId();  
    };
    
    $scope.cancel = function() {
        $location.path("/TaxRules");
    };
});