
angular.module('agilekartV2').controller('NewFeaturesController', function ($scope, $location, $resource, locationParser, FeaturesResource , FeatureOptionsResource, MerchantFeaturesResource, SequenceKeyTableResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.features = $scope.features || {};
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "FEA"+data.maxCount;
        	console.log(data);
        	$scope.features.featureId = prmryKy;
        	$scope.features.lastUpdateUserId = "ABC";
        	$scope.features.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/features');
            console.log("Inside getId");
		    catgry.save($scope.features, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
        	$scope.displayError = true;
        };
        
        SequenceKeyTableResource.get({SequenceKeyTableId:"FEA"}, successCallback, errorCallback);
    };
   

    $scope.save = function() {
    	console.log("fssfdfsd");
    	$scope.getId();
    };
    
    $scope.cancel = function() {
        $location.path("/Features");
    };
});