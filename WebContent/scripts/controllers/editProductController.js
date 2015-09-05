

angular.module('agilekartV2').controller('EditProductController', function($scope, $routeParams, $location, ProductResource , MerchantResource, ProductOptionResource, ProductReviewResource, ProductCategoryResource, OrderDetailsResource, OfferResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.product = new ProductResource(self.original);
            MerchantResource.queryAll(function(items) {
                $scope.merchantSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        merchantId : item.merchantId
                    };
                    var labelObject = {
                        value : item.merchantId,
                        text : item.merchantName
                    };
                    if($scope.product.merchant && item.merchantId == $scope.product.merchant.merchantId) {
                        $scope.merchantSelection = labelObject;
                        $scope.product.merchant = wrappedObject;
                        self.original.merchant = $scope.product.merchant;
                    }
                    return labelObject;
                });
            });
            ProductOptionResource.queryAll(function(items) {
                $scope.productOptionsSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        productOptionId : item.productOptionId
                    };
                    var labelObject = {
                        value : item.productOptionId,
                        text : item.productOptionName
                    };
                    if($scope.product.productOptions){
                        $.each($scope.product.productOptions, function(idx, element) {
                            if(item.productOptionId == element.productOptionId) {
                                $scope.productOptionsSelection.push(labelObject);
                                $scope.product.productOptions.push(wrappedObject);
                            }
                        });
                        self.original.productOptions = $scope.product.productOptions;
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
                        text : item.productReviewName
                    };
                    if($scope.product.productReviews){
                        $.each($scope.product.productReviews, function(idx, element) {
                            if(item.productReviewId == element.productReviewId) {
                                $scope.productReviewsSelection.push(labelObject);
                                $scope.product.productReviews.push(wrappedObject);
                            }
                        });
                        self.original.productReviews = $scope.product.productReviews;
                    }
                    return labelObject;
                });
            });
            ProductCategoryResource.queryAll(function(items) {
                $scope.productCategoriesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        productCategoryId : item.productCategoryId
                    };
                    var labelObject = {
                        value : item.productCategoryId,
                        text : item.productCategoryName
                    };
                    if($scope.product.productCategories){
                        $.each($scope.product.productCategories, function(idx, element) {
                            if(item.productCategoryId == element.productCategoryId) {
                                $scope.productCategoriesSelection.push(labelObject);
                                $scope.product.productCategories.push(wrappedObject);
                            }
                        });
                        self.original.productCategories = $scope.product.productCategories;
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
                        text : item.detailName
                    };
                    if($scope.product.orderDetailses){
                        $.each($scope.product.orderDetailses, function(idx, element) {
                            if(item.detailId == element.detailId) {
                                $scope.orderDetailsesSelection.push(labelObject);
                                $scope.product.orderDetailses.push(wrappedObject);
                            }
                        });
                        self.original.orderDetailses = $scope.product.orderDetailses;
                    }
                    return labelObject;
                });
            });
            OfferResource.queryAll(function(items) {
                $scope.offersSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        offerId : item.offerId
                    };
                    var labelObject = {
                        value : item.offerId,
                        text : item.offerName
                    };
                    if($scope.product.offers){
                        $.each($scope.product.offers, function(idx, element) {
                            if(item.offerId == element.offerId) {
                                $scope.offersSelection.push(labelObject);
                                $scope.product.offers.push(wrappedObject);
                            }
                        });
                        self.original.offers = $scope.product.offers;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Products");
        };
        ProductResource.get({ProductId:$routeParams.ProductId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.product);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.product.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Products");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Products");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.product.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("merchantSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.product.merchant = {};
            $scope.product.merchant.merchantId = selection.value;
        }
    });
    $scope.productUnlimitedList = [
        "true",  
        " false"  
    ];
    $scope.productOptionsSelection = $scope.productOptionsSelection || [];
    $scope.$watch("productOptionsSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.product) {
            $scope.product.productOptions = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.productOptionId = selectedItem.value;
                $scope.product.productOptions.push(collectionItem);
            });
        }
    });
    $scope.productReviewsSelection = $scope.productReviewsSelection || [];
    $scope.$watch("productReviewsSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.product) {
            $scope.product.productReviews = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.productReviewId = selectedItem.value;
                $scope.product.productReviews.push(collectionItem);
            });
        }
    });
    $scope.productCategoriesSelection = $scope.productCategoriesSelection || [];
    $scope.$watch("productCategoriesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.product) {
            $scope.product.productCategories = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.productCategoryId = selectedItem.value;
                $scope.product.productCategories.push(collectionItem);
            });
        }
    });
    $scope.orderDetailsesSelection = $scope.orderDetailsesSelection || [];
    $scope.$watch("orderDetailsesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.product) {
            $scope.product.orderDetailses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.detailId = selectedItem.value;
                $scope.product.orderDetailses.push(collectionItem);
            });
        }
    });
    $scope.offersSelection = $scope.offersSelection || [];
    $scope.$watch("offersSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.product) {
            $scope.product.offers = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.offerId = selectedItem.value;
                $scope.product.offers.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});