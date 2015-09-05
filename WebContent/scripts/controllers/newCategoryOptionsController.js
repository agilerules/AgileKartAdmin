
angular.module('agilekartV2').controller('NewCategoryOptionsController', function ($scope, $location, $resource,locationParser, CategoryOptionsResource , CategoryResource, OptionGroupsResource, SequenceKeyTableResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.categoryOptions = $scope.categoryOptions || {};
    
    $scope.categoryList = CategoryResource.queryAll(function(items){
        $scope.categorySelectionList = $.map(items, function(item) {
            return ( {
                value : item.categoryId,
                text : item.categoryName
            });
        });
    });
    $scope.$watch("categorySelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.categoryOptions.category = {};
            $scope.categoryOptions.category.categoryId = selection.value;
        }
    });
    
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
            $scope.categoryOptions.optionGroups = {};
            $scope.categoryOptions.optionGroups.optionGroupId = selection.value;
        }
    });
    
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "CATOPT"+data.maxCount;
        	console.log(data);
        	$scope.categoryOptions.categoryOptionsId = prmryKy;
        	$scope.categoryOptions.lastUpdateUserId = "ABC";
        	$scope.categoryOptions.lastUpdateTs = new Date();
        	console.log($scope.categoryOptions);
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
           
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/categoryoptions');
		    catgry.save($scope.categoryOptions, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"CATOPT"}, successCallback, errorCallback);
    };
    
    $scope.save = function() {
    	$scope.getId();
       
    };
    
    $scope.cancel = function() {
        $location.path("/CategoryOptions");
    };
});