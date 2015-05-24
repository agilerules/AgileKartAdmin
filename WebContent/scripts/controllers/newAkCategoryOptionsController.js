
angular.module('agileRulesKart').controller('NewAkCategoryOptionsController', function ($scope, $location, locationParser, AkCategoryOptionsResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.akCategoryOptions = $scope.akCategoryOptions || {};
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/AkCategoryOptions/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        AkCategoryOptionsResource.save($scope.akCategoryOptions, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/AkCategoryOptions");
    };
});