

angular.module('agilekartV2').controller('EditUsersController', function($scope, $routeParams, $location, UsersResource , OrdersResource, ProductReviewResource, UserRewardsResource, UserAddressResource, UserFavouritesResource, MerchantReviewResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.users = new UsersResource(self.original);
            OrdersResource.queryAll(function(items) {
                $scope.ordersesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        orderId : item.orderId
                    };
                    var labelObject = {
                        value : item.orderId,
                        text : item.orderId
                    };
                    if($scope.users.orderses){
                        $.each($scope.users.orderses, function(idx, element) {
                            if(item.orderId == element.orderId) {
                                $scope.ordersesSelection.push(labelObject);
                                $scope.users.orderses.push(wrappedObject);
                            }
                        });
                        self.original.orderses = $scope.users.orderses;
                    }
                    return labelObject;
                });
            });
            ProductReviewResource.queryAll(function(items) {
                $scope.productReviewsSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        productReviewId : item.productReviewId
                    };
                    var labelObject = {
                        value : item.productReviewId,
                        text : item.productReviewId
                    };
                    if($scope.users.productReviews){
                        $.each($scope.users.productReviews, function(idx, element) {
                            if(item.productReviewId == element.productReviewId) {
                                $scope.productReviewsSelection.push(labelObject);
                                $scope.users.productReviews.push(wrappedObject);
                            }
                        });
                        self.original.productReviews = $scope.users.productReviews;
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
                    if($scope.users.userRewardses){
                        $.each($scope.users.userRewardses, function(idx, element) {
                            if(item.rewardId == element.rewardId) {
                                $scope.userRewardsesSelection.push(labelObject);
                                $scope.users.userRewardses.push(wrappedObject);
                            }
                        });
                        self.original.userRewardses = $scope.users.userRewardses;
                    }
                    return labelObject;
                });
            });
            UserAddressResource.queryAll(function(items) {
                $scope.userAddressesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        addressId : item.addressId
                    };
                    var labelObject = {
                        value : item.addressId,
                        text : item.addressId
                    };
                    if($scope.users.userAddresses){
                        $.each($scope.users.userAddresses, function(idx, element) {
                            if(item.addressId == element.addressId) {
                                $scope.userAddressesSelection.push(labelObject);
                                $scope.users.userAddresses.push(wrappedObject);
                            }
                        });
                        self.original.userAddresses = $scope.users.userAddresses;
                    }
                    return labelObject;
                });
            });
            UserFavouritesResource.queryAll(function(items) {
                $scope.userFavouritesesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        userFavouriteId : item.userFavouriteId
                    };
                    var labelObject = {
                        value : item.userFavouriteId,
                        text : item.userFavouriteId
                    };
                    if($scope.users.userFavouriteses){
                        $.each($scope.users.userFavouriteses, function(idx, element) {
                            if(item.userFavouriteId == element.userFavouriteId) {
                                $scope.userFavouritesesSelection.push(labelObject);
                                $scope.users.userFavouriteses.push(wrappedObject);
                            }
                        });
                        self.original.userFavouriteses = $scope.users.userFavouriteses;
                    }
                    return labelObject;
                });
            });
            MerchantReviewResource.queryAll(function(items) {
                $scope.merchantReviewsSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        merchantReviewId : item.merchantReviewId
                    };
                    var labelObject = {
                        value : item.merchantReviewId,
                        text : item.merchantReviewId
                    };
                    if($scope.users.merchantReviews){
                        $.each($scope.users.merchantReviews, function(idx, element) {
                            if(item.merchantReviewId == element.merchantReviewId) {
                                $scope.merchantReviewsSelection.push(labelObject);
                                $scope.users.merchantReviews.push(wrappedObject);
                            }
                        });
                        self.original.merchantReviews = $scope.users.merchantReviews;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Users");
        };
        UsersResource.get({UsersId:$routeParams.UsersId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.users);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.users.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Users");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Users");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.users.$remove(successCallback, errorCallback);
    };
    
    $scope.userEmailVerifiedList = [
        "true",  
        " false"  
    ];
    $scope.ordersesSelection = $scope.ordersesSelection || [];
    $scope.$watch("ordersesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.users) {
            $scope.users.orderses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.orderId = selectedItem.value;
                $scope.users.orderses.push(collectionItem);
            });
        }
    });
    $scope.productReviewsSelection = $scope.productReviewsSelection || [];
    $scope.$watch("productReviewsSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.users) {
            $scope.users.productReviews = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.productReviewId = selectedItem.value;
                $scope.users.productReviews.push(collectionItem);
            });
        }
    });
    $scope.userRewardsesSelection = $scope.userRewardsesSelection || [];
    $scope.$watch("userRewardsesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.users) {
            $scope.users.userRewardses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.rewardId = selectedItem.value;
                $scope.users.userRewardses.push(collectionItem);
            });
        }
    });
    $scope.userAddressesSelection = $scope.userAddressesSelection || [];
    $scope.$watch("userAddressesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.users) {
            $scope.users.userAddresses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.addressId = selectedItem.value;
                $scope.users.userAddresses.push(collectionItem);
            });
        }
    });
    $scope.userFavouritesesSelection = $scope.userFavouritesesSelection || [];
    $scope.$watch("userFavouritesesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.users) {
            $scope.users.userFavouriteses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.userFavouriteId = selectedItem.value;
                $scope.users.userFavouriteses.push(collectionItem);
            });
        }
    });
    $scope.merchantReviewsSelection = $scope.merchantReviewsSelection || [];
    $scope.$watch("merchantReviewsSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.users) {
            $scope.users.merchantReviews = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.merchantReviewId = selectedItem.value;
                $scope.users.merchantReviews.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});