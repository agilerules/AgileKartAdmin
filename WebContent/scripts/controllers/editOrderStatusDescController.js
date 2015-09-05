

angular.module('agilekartV2').controller('EditOrderStatusDescController', function($scope, $routeParams, $location, OrderStatusDescResource , OrderStatusResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.orderStatusDesc = new OrderStatusDescResource(self.original);
            OrderStatusResource.queryAll(function(items) {
                $scope.orderStatusesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        orderStatusId : item.orderStatusId
                    };
                    var labelObject = {
                        value : item.orderStatusId,
                        text : item.orderStatusId
                    };
                    if($scope.orderStatusDesc.orderStatuses){
                        $.each($scope.orderStatusDesc.orderStatuses, function(idx, element) {
                            if(item.orderStatusId == element.orderStatusId) {
                                $scope.orderStatusesSelection.push(labelObject);
                                $scope.orderStatusDesc.orderStatuses.push(wrappedObject);
                            }
                        });
                        self.original.orderStatuses = $scope.orderStatusDesc.orderStatuses;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/OrderStatusDescs");
        };
        OrderStatusDescResource.get({OrderStatusDescId:$routeParams.OrderStatusDescId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.orderStatusDesc);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.orderStatusDesc.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/OrderStatusDescs");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/OrderStatusDescs");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.orderStatusDesc.$remove(successCallback, errorCallback);
    };
    
    $scope.orderStatusesSelection = $scope.orderStatusesSelection || [];
    $scope.$watch("orderStatusesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.orderStatusDesc) {
            $scope.orderStatusDesc.orderStatuses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.orderStatusId = selectedItem.value;
                $scope.orderStatusDesc.orderStatuses.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});