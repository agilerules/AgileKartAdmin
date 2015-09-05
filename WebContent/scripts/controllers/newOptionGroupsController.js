
angular.module('agilekartV2').controller('NewOptionGroupsController', function ($scope, $location, locationParser, OptionGroupsResource , OptionsResource, CategoryOptionsResource, ProductOptionResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.optionGroups = $scope.optionGroups || {};
    
    $scope.optionsesList = OptionsResource.queryAll(function(items){
        $scope.optionsesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.optionId,
                text : item.optionName
            });
        });
    });
    $scope.$watch("optionsesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.optionGroups.optionses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.optionId = selectedItem.value;
                $scope.optionGroups.optionses.push(collectionItem);
            });
        }
    });
    
    $scope.categoryOptionsesList = CategoryOptionsResource.queryAll(function(items){
        $scope.categoryOptionsesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.categoryOptionsId,
                text : item.categoryOptionsName
            });
        });
    });
    $scope.$watch("categoryOptionsesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.optionGroups.categoryOptionses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.categoryOptionsId = selectedItem.value;
                $scope.optionGroups.categoryOptionses.push(collectionItem);
            });
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
            $scope.optionGroups.productOptions = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.productOptionId = selectedItem.value;
                $scope.optionGroups.productOptions.push(collectionItem);
            });
        }
    });
    
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "OPTGRP"+data.maxCount;
        	console.log(data);
        	$scope.optionGroups.optionGroupId = prmryKy;
        	$scope.optionGroups.lastUpdateUserId = "ABC";
            $scope.optionGroups.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/optiongroups');
		    catgry.save($scope.optionGroups, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"OPTGRP"}, successCallback, errorCallback);
    };
    
    $scope.save = function() {
    	$scope.getId();  
    };
    
    $scope.cancel = function() {
        $location.path("/OptionGroups");
    };
});