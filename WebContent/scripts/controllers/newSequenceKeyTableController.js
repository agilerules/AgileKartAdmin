
angular.module('agilekartV2').controller('NewSequenceKeyTableController', function ($scope, $location, locationParser, SequenceKeyTableResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.sequenceKeyTable = $scope.sequenceKeyTable || {};
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/SequenceKeyTables/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        SequenceKeyTableResource.save($scope.sequenceKeyTable, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/SequenceKeyTables");
    };
});