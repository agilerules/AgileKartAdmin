
angular.module('agilekartV2').controller('NewCategoryController', function ($scope, $location, $resource, locationParser, CategoryResource, SequenceKeyTableResource ) {
    $scope.disabled = false;
    $scope.sequenceKeyTable =  $scope.sequenceKeyTable || {};
    $scope.$location = $location;
    $scope.category = $scope.category || {};
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "CAT"+data.maxCount;
        	console.log(data);
        	$scope.category.categoryId = prmryKy;
        	$scope.category.lastUpdateUserId = "ABC";
            $scope.category.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/categories');
		    catgry.save($scope.category, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"CAT"}, successCallback, errorCallback);
    };

    $scope.save = function() {
    	
    	$scope.getId();
        
    };
    
    $scope.cancel = function() {
        $location.path("/Categories");
    };
});