

angular.module('agileRulesKart').controller('EditAkOrdersController', function($scope, $routeParams, $location, AkOrdersResource , AkUsersResource, AkOrderDetailsResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.akOrders = new AkOrdersResource(self.original);
            AkUsersResource.queryAll(function(items) {
                $scope.akUsersSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        userId : item.userId
                    };
                    var labelObject = {
                        value : item.userId,
                        text : item.userId
                    };
                    if($scope.akOrders.akUsers && item.userId == $scope.akOrders.akUsers.userId) {
                        $scope.akUsersSelection = labelObject;
                        $scope.akOrders.akUsers = wrappedObject;
                        self.original.akUsers = $scope.akOrders.akUsers;
                    }
                    return labelObject;
                });
            });
            AkOrderDetailsResource.queryAll(function(items) {
                $scope.akOrderDetailsesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        detailId : item.detailId
                    };
                    var labelObject = {
                        value : item.detailId,
                        text : item.detailId
                    };
                    if($scope.akOrders.akOrderDetailses){
                        $.each($scope.akOrders.akOrderDetailses, function(idx, element) {
                            if(item.detailId == element.detailId) {
                                $scope.akOrderDetailsesSelection.push(labelObject);
                                $scope.akOrders.akOrderDetailses.push(wrappedObject);
                            }
                        });
                        self.original.akOrderDetailses = $scope.akOrders.akOrderDetailses;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/AkOrders");
        };
        AkOrdersResource.get({AkOrdersId:$routeParams.AkOrdersId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.akOrders);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.akOrders.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/AkOrders");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/AkOrders");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.akOrders.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("akUsersSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.akOrders.akUsers = {};
            $scope.akOrders.akUsers.userId = selection.value;
        }
    });
    $scope.akOrderDetailsesSelection = $scope.akOrderDetailsesSelection || [];
    $scope.$watch("akOrderDetailsesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.akOrders) {
            $scope.akOrders.akOrderDetailses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.detailId = selectedItem.value;
                $scope.akOrders.akOrderDetailses.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});