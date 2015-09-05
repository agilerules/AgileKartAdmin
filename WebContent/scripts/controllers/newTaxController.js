
angular.module('agilekartV2').controller('NewTaxController', function ($scope, $location, locationParser, TaxResource , TaxRuleResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.tax = $scope.tax || {};
    
    $scope.taxRulesList = TaxRuleResource.queryAll(function(items){
        $scope.taxRulesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.taxRuleId,
                text : item.taxRuleId
            });
        });
    });
    $scope.$watch("taxRulesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.tax.taxRules = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.taxRuleId = selectedItem.value;
                $scope.tax.taxRules.push(collectionItem);
            });
        }
    });
    
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "TAX"+data.maxCount;
        	console.log(data);
        	$scope.tax.taxId = prmryKy;
        	$scope.tax.lastUpdateUserId = "ABC";
            $scope.tax.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/taxes');
		    catgry.save($scope.tax, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"TAX"}, successCallback, errorCallback);
    };

    $scope.save = function() {
    	$scope.getId();  
    };
    
    $scope.cancel = function() {
        $location.path("/Taxes");
    };
});