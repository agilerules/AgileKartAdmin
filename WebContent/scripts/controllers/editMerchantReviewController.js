

angular.module('agilekartV2').controller('EditMerchantReviewController', function($scope, $routeParams, $location, MerchantReviewResource , MerchantResource, UsersResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.merchantReview = new MerchantReviewResource(self.original);
            MerchantResource.queryAll(function(items) {
                $scope.merchantSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        merchantId : item.merchantId
                    };
                    var labelObject = {
                        value : item.merchantId,
                        text : item.merchantName
                    };
                    if($scope.merchantReview.merchant && item.merchantId == $scope.merchantReview.merchant.merchantId) {
                        $scope.merchantSelection = labelObject;
                        $scope.merchantReview.merchant = wrappedObject;
                        self.original.merchant = $scope.merchantReview.merchant;
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
                        text : item.userName
                    };
                    if($scope.merchantReview.users && item.userId == $scope.merchantReview.users.userId) {
                        $scope.usersSelection = labelObject;
                        $scope.merchantReview.users = wrappedObject;
                        self.original.users = $scope.merchantReview.users;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/MerchantReviews");
        };
        MerchantReviewResource.get({MerchantReviewId:$routeParams.MerchantReviewId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.merchantReview);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.merchantReview.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/MerchantReviews");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/MerchantReviews");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.merchantReview.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("merchantSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.merchantReview.merchant = {};
            $scope.merchantReview.merchant.merchantId = selection.value;
        }
    });
    $scope.$watch("usersSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.merchantReview.users = {};
            $scope.merchantReview.users.userId = selection.value;
        }
    });
    
    $scope.get();
});