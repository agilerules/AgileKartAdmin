
angular.module('agilekartV2').controller('NewProductOptionController', function ($scope, $location, locationParser, ProductOptionResource , OptionGroupsResource, OptionsResource, ProductResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.productOption = $scope.productOption || {};
    
    $scope.optionGroupsList = OptionGroupsResource.queryAll(function(items){
        $scope.optionGroupsSelectionList = $.map(items, function(item) {
            return ( {
                value : item.optionGroupId,
                text : item.optionGroupName
            });
        });
    });
    $scope.$watch("optionGroupsSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.productOption.optionGroups = {};
            $scope.productOption.optionGroups.optionGroupId = selection.value;
        }
    });
    
    $scope.optionsList = OptionsResource.queryAll(function(items){
        $scope.optionsSelectionList = $.map(items, function(item) {
            return ( {
                value : item.optionId,
                text : item.optionName
            });
        });
    });
    $scope.$watch("optionsSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.productOption.options = {};
            $scope.productOption.options.optionId = selection.value;
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
            $scope.productOption.product = {};
            $scope.productOption.product.productId = selection.value;
        }
    });
    
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "PDTOPT"+data.maxCount;
        	console.log(data);
        	$scope.productOption.productOptionId = prmryKy;
        	$scope.productOption.lastUpdateUserId = "ABC";
            $scope.productOption.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/productoptions');
		    catgry.save($scope.productOption, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"PDTOPT"}, successCallback, errorCallback);
    };

    $scope.save = function() {
    	$scope.getId();  
    };
    
    $scope.cancel = function() {
        $location.path("/ProductOptions");
    };
});