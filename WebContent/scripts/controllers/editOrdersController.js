

angular.module('agilekartV2').controller('EditOrdersController', function($scope, $routeParams, $location, OrdersResource , PaymentGatewayResource, UsersResource, OrderStatusResource, OrderDetailsResource, UserRewardsResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.orders = new OrdersResource(self.original);
            PaymentGatewayResource.queryAll(function(items) {
                $scope.paymentGatewaySelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        paymentGatewayId : item.paymentGatewayId
                    };
                    var labelObject = {
                        value : item.paymentGatewayId,
                        text : item.paymentGatewayId
                    };
                    if($scope.orders.paymentGateway && item.paymentGatewayId == $scope.orders.paymentGateway.paymentGatewayId) {
                        $scope.paymentGatewaySelection = labelObject;
                        $scope.orders.paymentGateway = wrappedObject;
                        self.original.paymentGateway = $scope.orders.paymentGateway;
                    }
                    return labelObject;
                });
            });
            UsersResource.queryAll(function(items) {
                $scope.usersSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        userId : item.userId
                    };
                    var labelObject = {
                        value : item.userId,
                        text : item.userId
                    };
                    if($scope.orders.users && item.userId == $scope.orders.users.userId) {
                        $scope.usersSelection = labelObject;
                        $scope.orders.users = wrappedObject;
                        self.original.users = $scope.orders.users;
                    }
                    return labelObject;
                });
            });
            OrderStatusResource.queryAll(function(items) {
                $scope.orderStatusesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        orderStatusId : item.orderStatusId
                    };
                    var labelObject = {
                        value : item.orderStatusId,
                        text : item.orderStatusId
                    };
                    if($scope.orders.orderStatuses){
                        $.each($scope.orders.orderStatuses, function(idx, element) {
                            if(item.orderStatusId == element.orderStatusId) {
                                $scope.orderStatusesSelection.push(labelObject);
                                $scope.orders.orderStatuses.push(wrappedObject);
                            }
                        });
                        self.original.orderStatuses = $scope.orders.orderStatuses;
                    }
                    return labelObject;
                });
            });
            OrderDetailsResource.queryAll(function(items) {
                $scope.orderDetailsesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        detailId : item.detailId
                    };
                    var labelObject = {
                        value : item.detailId,
                        text : item.detailId
                    };
                    if($scope.orders.orderDetailses){
                        $.each($scope.orders.orderDetailses, function(idx, element) {
                            if(item.detailId == element.detailId) {
                                $scope.orderDetailsesSelection.push(labelObject);
                                $scope.orders.orderDetailses.push(wrappedObject);
                            }
                        });
                        self.original.orderDetailses = $scope.orders.orderDetailses;
                    }
                    return labelObject;
                });
            });
            UserRewardsResource.queryAll(function(items) {
                $scope.userRewardsesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        rewardId : item.rewardId
                    };
                    var labelObject = {
                        value : item.rewardId,
                        text : item.rewardId
                    };
                    if($scope.orders.userRewardses){
                        $.each($scope.orders.userRewardses, function(idx, element) {
                            if(item.rewardId == element.rewardId) {
                                $scope.userRewardsesSelection.push(labelObject);
                                $scope.orders.userRewardses.push(wrappedObject);
                            }
                        });
                        self.original.userRewardses = $scope.orders.userRewardses;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Orders");
        };
        OrdersResource.get({OrdersId:$routeParams.OrdersId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.orders);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.orders.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Orders");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Orders");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.orders.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("paymentGatewaySelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.orders.paymentGateway = {};
            $scope.orders.paymentGateway.paymentGatewayId = selection.value;
        }
    });
    $scope.$watch("usersSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.orders.users = {};
            $scope.orders.users.userId = selection.value;
        }
    });
    $scope.orderStatusesSelection = $scope.orderStatusesSelection || [];
    $scope.$watch("orderStatusesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.orders) {
            $scope.orders.orderStatuses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.orderStatusId = selectedItem.value;
                $scope.orders.orderStatuses.push(collectionItem);
            });
        }
    });
    $scope.orderDetailsesSelection = $scope.orderDetailsesSelection || [];
    $scope.$watch("orderDetailsesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.orders) {
            $scope.orders.orderDetailses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.detailId = selectedItem.value;
                $scope.orders.orderDetailses.push(collectionItem);
            });
        }
    });
    $scope.userRewardsesSelection = $scope.userRewardsesSelection || [];
    $scope.$watch("userRewardsesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.orders) {
            $scope.orders.userRewardses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.rewardId = selectedItem.value;
                $scope.orders.userRewardses.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});