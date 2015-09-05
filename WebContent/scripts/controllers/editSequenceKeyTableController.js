

angular.module('agilekartV2').controller('EditSequenceKeyTableController', function($scope, $routeParams, $location, SequenceKeyTableResource ) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.sequenceKeyTable = new SequenceKeyTableResource(self.original);
        };
        var errorCallback = function() {
            $location.path("/SequenceKeyTables");
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:$routeParams.SequenceKeyTableId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.sequenceKeyTable);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.sequenceKeyTable.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/SequenceKeyTables");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/SequenceKeyTables");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.sequenceKeyTable.$remove(successCallback, errorCallback);
    };
    
    
    $scope.get();
});