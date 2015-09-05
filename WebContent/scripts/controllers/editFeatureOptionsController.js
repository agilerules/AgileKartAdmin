

angular.module('agilekartV2').controller('EditFeatureOptionsController', function($scope, $routeParams, $location, FeatureOptionsResource , FeaturesResource, MerchantFeaturesResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.featureOptions = new FeatureOptionsResource(self.original);
            FeaturesResource.queryAll(function(items) {
                $scope.featuresSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        featureId : item.featureId
                    };
                    var labelObject = {
                        value : item.featureId,
                        text : item.featureName
                    };
                    if($scope.featureOptions.features && item.featureId == $scope.featureOptions.features.featureId) {
                        $scope.featuresSelection = labelObject;
                        $scope.featureOptions.features = wrappedObject;
                        self.original.features = $scope.featureOptions.features;
                    }
                    return labelObject;
                });
            });
            MerchantFeaturesResource.queryAll(function(items) {
                $scope.merchantFeaturesesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        merchantFeaturesId : item.merchantFeaturesId
                    };
                    var labelObject = {
                        value : item.merchantFeaturesId,
                        text : item.merchantFeaturesId
                    };
                    if($scope.featureOptions.merchantFeatureses){
                        $.each($scope.featureOptions.merchantFeatureses, function(idx, element) {
                            if(item.merchantFeaturesId == element.merchantFeaturesId) {
                                $scope.merchantFeaturesesSelection.push(labelObject);
                                $scope.featureOptions.merchantFeatureses.push(wrappedObject);
                            }
                        });
                        self.original.merchantFeatureses = $scope.featureOptions.merchantFeatureses;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/FeatureOptions");
        };
        FeatureOptionsResource.get({FeatureOptionsId:$routeParams.FeatureOptionsId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.featureOptions);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.featureOptions.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/FeatureOptions");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/FeatureOptions");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.featureOptions.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("featuresSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.featureOptions.features = {};
            $scope.featureOptions.features.featureId = selection.value;
        }
    });
    $scope.merchantFeaturesesSelection = $scope.merchantFeaturesesSelection || [];
    $scope.$watch("merchantFeaturesesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.featureOptions) {
            $scope.featureOptions.merchantFeatureses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.merchantFeaturesId = selectedItem.value;
                $scope.featureOptions.merchantFeatureses.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});