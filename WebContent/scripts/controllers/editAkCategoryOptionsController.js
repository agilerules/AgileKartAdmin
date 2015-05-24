

angular.module('agileRulesKart').controller('EditAkCategoryOptionsController', function($scope, $routeParams, $location, AkCategoryOptionsResource ) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.akCategoryOptions = new AkCategoryOptionsResource(self.original);
        };
        var errorCallback = function() {
            $location.path("/AkCategoryOptions");
        };
        AkCategoryOptionsResource.get({AkCategoryOptionsId:$routeParams.AkCategoryOptionsId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.akCategoryOptions);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.akCategoryOptions.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/AkCategoryOptions");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/AkCategoryOptions");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.akCategoryOptions.$remove(successCallback, errorCallback);
    };
    
    
    $scope.get();
});