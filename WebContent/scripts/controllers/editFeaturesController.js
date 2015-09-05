

angular.module('agilekartV2').controller('EditFeaturesController', function($scope, $routeParams, $location, FeaturesResource , FeatureOptionsResource, MerchantFeaturesResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.features = new FeaturesResource(self.original);
        };
        var errorCallback = function() {
            $location.path("/Features");
        };
        FeaturesResource.get({FeaturesId:$routeParams.FeaturesId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.features);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.features.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Features");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Features");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.features.$remove(successCallback, errorCallback);
    };
    $scope.get();
});