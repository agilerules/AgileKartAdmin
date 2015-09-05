
angular.module('agilekartV2').controller('NewFeatureOptionsController', function ($scope, $resource, $location, locationParser, FeatureOptionsResource , FeaturesResource, SequenceKeyTableResource, MerchantFeaturesResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.featureOptions = $scope.featureOptions || {};
    
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "FEAOPT"+data.maxCount;
        	console.log(prmryKy);
        	 $scope.featureOptions.featureOptionsId= prmryKy;
        	$scope.featureOptions.lastUpdateUserId = "ABC";
        	$scope.featureOptions.lastUpdateTs = new Date();
        	console.log($scope.featureOptions);
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/featureoptions');
            console.log("Inside getId");
		    catgry.save($scope.featureOptions, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
        	$scope.displayError = true;
        };
        
        console.log("sssssssss");
        SequenceKeyTableResource.get({SequenceKeyTableId:"FEAOPT"}, successCallback, errorCallback);
    };
    
    $scope.featuresList = FeaturesResource.queryAll(function(items){
        $scope.featuresSelectionList = $.map(items, function(item) {
            return ( {
                value : item.featureId,
                text : item.featureName
            });
        });
    });
    $scope.$watch("featuresSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.featureOptions.features = {};
            $scope.featureOptions.features.featureId = selection.value;
        }
    });
    
    $scope.merchantFeaturesesList = MerchantFeaturesResource.queryAll(function(items){
        $scope.merchantFeaturesesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.merchantFeaturesId,
                text : item.merchantFeaturesId
            });
        });
    });
    $scope.$watch("merchantFeaturesesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.featureOptions.merchantFeatureses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.merchantFeaturesId = selectedItem.value;
                $scope.featureOptions.merchantFeatureses.push(collectionItem);
            });
        }
    });
    

    $scope.save = function() {
    	console.log("fssfdfsd");
    	$scope.getId();
    };
    
    $scope.cancel = function() {
        $location.path("/FeatureOptions");
    };
});
