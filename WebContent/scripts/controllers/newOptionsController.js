
angular.module('agilekartV2').controller('NewOptionsController', function ($scope, $location, locationParser, OptionsResource , OptionGroupsResource, ProductOptionResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.options = $scope.options || {};
    
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
            $scope.options.optionGroups = {};
            $scope.options.optionGroups.optionGroupId = selection.value;
        }
    });
    
    $scope.productOptionsList = ProductOptionResource.queryAll(function(items){
        $scope.productOptionsSelectionList = $.map(items, function(item) {
            return ( {
                value : item.productOptionId,
                text : item.productOptionName
            });
        });
    });
    $scope.$watch("productOptionsSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.options.productOptions = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.productOptionId = selectedItem.value;
                $scope.options.productOptions.push(collectionItem);
            });
        }
    });
    
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "OPT"+data.maxCount;
        	console.log(data);
        	$scope.options.optionId = prmryKy;
        	$scope.options.lastUpdateUserId = "ABC";
            $scope.options.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/options');
		    catgry.save($scope.options, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"OPT"}, successCallback, errorCallback);
    };
    
    $scope.save = function() {
    	$scope.getId();  
    };
    
    $scope.cancel = function() {
        $location.path("/Options");
    };
});