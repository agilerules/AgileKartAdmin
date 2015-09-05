

angular.module('agilekartV2').controller('EditProductReviewController', function($scope, $routeParams, $location, ProductReviewResource , ProductResource, UsersResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.productReview = new ProductReviewResource(self.original);
            ProductResource.queryAll(function(items) {
                $scope.productSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        productId : item.productId
                    };
                    var labelObject = {
                        value : item.productId,
                        text : item.productName
                    };
                    if($scope.productReview.product && item.productId == $scope.productReview.product.productId) {
                        $scope.productSelection = labelObject;
                        $scope.productReview.product = wrappedObject;
                        self.original.product = $scope.productReview.product;
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
                    if($scope.productReview.users && item.userId == $scope.productReview.users.userId) {
                        $scope.usersSelection = labelObject;
                        $scope.productReview.users = wrappedObject;
                        self.original.users = $scope.productReview.users;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/ProductReviews");
        };
        ProductReviewResource.get({ProductReviewId:$routeParams.ProductReviewId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.productReview);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.productReview.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/ProductReviews");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/ProductReviews");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.productReview.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("productSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.productReview.product = {};
            $scope.productReview.product.productId = selection.value;
        }
    });
    $scope.$watch("usersSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.productReview.users = {};
            $scope.productReview.users.userId = selection.value;
        }
    });
    
    $scope.get();
});