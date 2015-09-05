

angular.module('agilekartV2').controller('EditMerchantFeaturesController', function($scope, $routeParams, $location, MerchantFeaturesResource , FeatureOptionsResource, FeaturesResource, MerchantResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.merchantFeatures = new MerchantFeaturesResource(self.original);
            FeatureOptionsResource.queryAll(function(items) {
                $scope.featureOptionsSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        featureOptionsId : item.featureOptionsId
                    };
                    var labelObject = {
                        value : item.featureOptionsId,
                        text : item.featureOptionName
                    };
                    if($scope.merchantFeatures.featureOptions && item.featureOptionsId == $scope.merchantFeatures.featureOptions.featureOptionsId) {
                        $scope.featureOptionsSelection = labelObject;
                        $scope.merchantFeatures.featureOptions = wrappedObject;
                        self.original.featureOptions = $scope.merchantFeatures.featureOptions;
                    }
                    return labelObject;
                });
            });
            FeaturesResource.queryAll(function(items) {
                $scope.featuresSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        featureId : item.featureId
                    };
                    var labelObject = {
                        value : item.featureId,
                        text : item.featureName
                    };
                    if($scope.merchantFeatures.features && item.featureId == $scope.merchantFeatures.features.featureId) {
                        $scope.featuresSelection = labelObject;
                        $scope.merchantFeatures.features = wrappedObject;
                        self.original.features = $scope.merchantFeatures.features;
                    }
                    return labelObject;
                });
            });
            MerchantResource.queryAll(function(items) {
                $scope.merchantSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        merchantId : item.merchantId
                    };
                    var labelObject = {
                        value : item.merchantId,
                        text : item.merchantName
                    };
                    if($scope.merchantFeatures.merchant && item.merchantId == $scope.merchantFeatures.merchant.merchantId) {
                        $scope.merchantSelection = labelObject;
                        $scope.merchantFeatures.merchant = wrappedObject;
                        self.original.merchant = $scope.merchantFeatures.merchant;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/MerchantFeatures");
        };
        MerchantFeaturesResource.get({MerchantFeaturesId:$routeParams.MerchantFeaturesId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.merchantFeatures);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.merchantFeatures.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/MerchantFeatures");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/MerchantFeatures");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.merchantFeatures.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("featureOptionsSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.merchantFeatures.featureOptions = {};
            $scope.merchantFeatures.featureOptions.featureOptionsId = selection.value;
        }
    });
    $scope.$watch("featuresSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.merchantFeatures.features = {};
            $scope.merchantFeatures.features.featureId = selection.value;
        }
    });
    $scope.$watch("merchantSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.merchantFeatures.merchant = {};
            $scope.merchantFeatures.merchant.merchantId = selection.value;
        }
    });
    
    $scope.get();
});