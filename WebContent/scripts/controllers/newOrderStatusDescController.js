
angular.module('agilekartV2').controller('NewOrderStatusDescController', function ($scope, $location, locationParser, OrderStatusDescResource , OrderStatusResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.orderStatusDesc = $scope.orderStatusDesc || {};
    
    $scope.orderStatusesList = OrderStatusResource.queryAll(function(items){
        $scope.orderStatusesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.orderStatusId,
                text : item.orderStatusId
            });
        });
    });
    $scope.$watch("orderStatusesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.orderStatusDesc.orderStatuses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.orderStatusId = selectedItem.value;
                $scope.orderStatusDesc.orderStatuses.push(collectionItem);
            });
        }
    });
    
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "ODRSTADES"+data.maxCount;
        	console.log(data);
        	$scope.orderStatusDesc.orderStatusDescId = prmryKy;
        	$scope.orderStatusDesc.lastUpdateUserId = "ABC";
            $scope.orderStatusDesc.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/orderstatusdescs');
		    catgry.save($scope.orderStatusDesc, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"ODRSTADES"}, successCallback, errorCallback);
    };

    $scope.save = function() {
    	$scope.getId();  
    };
    
    $scope.cancel = function() {
        $location.path("/OrderStatusDescs");
    };
});