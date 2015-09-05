
angular.module('agilekartV2').controller('NewUserAddressController', function ($scope, $location, locationParser, UserAddressResource , UsersResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.userAddress = $scope.userAddress || {};
    
    $scope.usersList = UsersResource.queryAll(function(items){
        $scope.usersSelectionList = $.map(items, function(item) {
            return ( {
                value : item.userId,
                text : item.userId
            });
        });
    });
    $scope.$watch("usersSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.userAddress.users = {};
            $scope.userAddress.users.userId = selection.value;
        }
    });
    
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "USRADR"+data.maxCount;
        	console.log(data);
        	$scope.userAddress.addressId = prmryKy;
        	$scope.userAddress.lastUpdateUserId = "ABC";
            $scope.userAddress.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/useraddresses');
		    catgry.save($scope.userAddress, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"USRADR"}, successCallback, errorCallback);
    };

    $scope.save = function() {
    	$scope.getId();  
    };
    
    $scope.cancel = function() {
        $location.path("/UserAddresses");
    };
});