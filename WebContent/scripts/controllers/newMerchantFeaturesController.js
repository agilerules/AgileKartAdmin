
angular.module('agilekartV2').controller('NewMerchantFeaturesController', function ($scope, $location, locationParser, MerchantFeaturesResource , FeatureOptionsResource, FeaturesResource, MerchantResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.merchantFeatures = $scope.merchantFeatures || {};
    
    $scope.featureOptionsList = FeatureOptionsResource.queryAll(function(items){
        $scope.featureOptionsSelectionList = $.map(items, function(item) {
            return ( {
                value : item.featureOptionsId,
                text : item.featureOptionName
            });
        });
    });
    $scope.$watch("featureOptionsSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.merchantFeatures.featureOptions = {};
            $scope.merchantFeatures.featureOptions.featureOptionsId = selection.value;
        }
    });
    
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
            $scope.merchantFeatures.features = {};
            $scope.merchantFeatures.features.featureId = selection.value;
        }
    });
    
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
            $scope.merchantFeatures.merchant = {};
            $scope.merchantFeatures.merchant.merchantId = selection.value;
        }
    });
    
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "MERFEA"+data.maxCount;
        	console.log(data);
        	$scope.merchantFeatures.merchantFeaturesId = prmryKy;
        	$scope.merchantFeatures.lastUpdateUserId = "ABC";
            $scope.merchantFeatures.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/merchantfeatures');
		    catgry.save($scope.merchantFeatures, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"MERFEA"}, successCallback, errorCallback);
    };

    $scope.save = function() {
    	$scope.getId();
    };
    
    $scope.cancel = function() {
        $location.path("/MerchantFeatures");
    };
});