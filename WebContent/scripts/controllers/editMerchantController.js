

angular.module('agilekartV2').controller('EditMerchantController', function($scope, $routeParams, $location, MerchantResource , MerchantFeaturesResource, OfferResource, MerchantReviewResource, MerchantCategoryResource, MerchantAddressResource, MerchantPaymentGatewayResource, LoyaltyProgramMerchantResource, TaxRuleMerchantResource, UserFavouritesResource, ProductResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.merchant = new MerchantResource(self.original);
            MerchantFeaturesResource.queryAll(function(items) {
                $scope.merchantFeaturesesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        merchantFeaturesId : item.merchantFeaturesId
                    };
                    var labelObject = {
                        value : item.merchantFeaturesId,
                        text : item.merchantFeaturesId
                    };
                    if($scope.merchant.merchantFeatureses){
                        $.each($scope.merchant.merchantFeatureses, function(idx, element) {
                            if(item.merchantFeaturesId == element.merchantFeaturesId) {
                                $scope.merchantFeaturesesSelection.push(labelObject);
                                $scope.merchant.merchantFeatureses.push(wrappedObject);
                            }
                        });
                        self.original.merchantFeatureses = $scope.merchant.merchantFeatureses;
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
                        text : item.offerId
                    };
                    if($scope.merchant.offers){
                        $.each($scope.merchant.offers, function(idx, element) {
                            if(item.offerId == element.offerId) {
                                $scope.offersSelection.push(labelObject);
                                $scope.merchant.offers.push(wrappedObject);
                            }
                        });
                        self.original.offers = $scope.merchant.offers;
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
                    if($scope.merchant.merchantReviews){
                        $.each($scope.merchant.merchantReviews, function(idx, element) {
                            if(item.merchantReviewId == element.merchantReviewId) {
                                $scope.merchantReviewsSelection.push(labelObject);
                                $scope.merchant.merchantReviews.push(wrappedObject);
                            }
                        });
                        self.original.merchantReviews = $scope.merchant.merchantReviews;
                    }
                    return labelObject;
                });
            });
            MerchantCategoryResource.queryAll(function(items) {
                $scope.merchantCategoriesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        merchantCategoryId : item.merchantCategoryId
                    };
                    var labelObject = {
                        value : item.merchantCategoryId,
                        text : item.merchantCategoryId
                    };
                    if($scope.merchant.merchantCategories){
                        $.each($scope.merchant.merchantCategories, function(idx, element) {
                            if(item.merchantCategoryId == element.merchantCategoryId) {
                                $scope.merchantCategoriesSelection.push(labelObject);
                                $scope.merchant.merchantCategories.push(wrappedObject);
                            }
                        });
                        self.original.merchantCategories = $scope.merchant.merchantCategories;
                    }
                    return labelObject;
                });
            });
            MerchantAddressResource.queryAll(function(items) {
                $scope.merchantAddressesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        merchantAddressId : item.merchantAddressId
                    };
                    var labelObject = {
                        value : item.merchantAddressId,
                        text : item.merchantAddressId
                    };
                    if($scope.merchant.merchantAddresses){
                        $.each($scope.merchant.merchantAddresses, function(idx, element) {
                            if(item.merchantAddressId == element.merchantAddressId) {
                                $scope.merchantAddressesSelection.push(labelObject);
                                $scope.merchant.merchantAddresses.push(wrappedObject);
                            }
                        });
                        self.original.merchantAddresses = $scope.merchant.merchantAddresses;
                    }
                    return labelObject;
                });
            });
            MerchantPaymentGatewayResource.queryAll(function(items) {
                $scope.merchantPaymentGatewaysSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        merchantPaymentGatewayId : item.merchantPaymentGatewayId
                    };
                    var labelObject = {
                        value : item.merchantPaymentGatewayId,
                        text : item.merchantPaymentGatewayId
                    };
                    if($scope.merchant.merchantPaymentGateways){
                        $.each($scope.merchant.merchantPaymentGateways, function(idx, element) {
                            if(item.merchantPaymentGatewayId == element.merchantPaymentGatewayId) {
                                $scope.merchantPaymentGatewaysSelection.push(labelObject);
                                $scope.merchant.merchantPaymentGateways.push(wrappedObject);
                            }
                        });
                        self.original.merchantPaymentGateways = $scope.merchant.merchantPaymentGateways;
                    }
                    return labelObject;
                });
            });
            LoyaltyProgramMerchantResource.queryAll(function(items) {
                $scope.loyaltyProgramMerchantsSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        loyaltyProgramMerchantId : item.loyaltyProgramMerchantId
                    };
                    var labelObject = {
                        value : item.loyaltyProgramMerchantId,
                        text : item.loyaltyProgramMerchantId
                    };
                    if($scope.merchant.loyaltyProgramMerchants){
                        $.each($scope.merchant.loyaltyProgramMerchants, function(idx, element) {
                            if(item.loyaltyProgramMerchantId == element.loyaltyProgramMerchantId) {
                                $scope.loyaltyProgramMerchantsSelection.push(labelObject);
                                $scope.merchant.loyaltyProgramMerchants.push(wrappedObject);
                            }
                        });
                        self.original.loyaltyProgramMerchants = $scope.merchant.loyaltyProgramMerchants;
                    }
                    return labelObject;
                });
            });
            TaxRuleMerchantResource.queryAll(function(items) {
                $scope.taxRuleMerchantsSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        taxRuleMerchantId : item.taxRuleMerchantId
                    };
                    var labelObject = {
                        value : item.taxRuleMerchantId,
                        text : item.taxRuleMerchantId
                    };
                    if($scope.merchant.taxRuleMerchants){
                        $.each($scope.merchant.taxRuleMerchants, function(idx, element) {
                            if(item.taxRuleMerchantId == element.taxRuleMerchantId) {
                                $scope.taxRuleMerchantsSelection.push(labelObject);
                                $scope.merchant.taxRuleMerchants.push(wrappedObject);
                            }
                        });
                        self.original.taxRuleMerchants = $scope.merchant.taxRuleMerchants;
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
                    if($scope.merchant.userFavouriteses){
                        $.each($scope.merchant.userFavouriteses, function(idx, element) {
                            if(item.userFavouriteId == element.userFavouriteId) {
                                $scope.userFavouritesesSelection.push(labelObject);
                                $scope.merchant.userFavouriteses.push(wrappedObject);
                            }
                        });
                        self.original.userFavouriteses = $scope.merchant.userFavouriteses;
                    }
                    return labelObject;
                });
            });
            ProductResource.queryAll(function(items) {
                $scope.productsSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        productId : item.productId
                    };
                    var labelObject = {
                        value : item.productId,
                        text : item.productId
                    };
                    if($scope.merchant.products){
                        $.each($scope.merchant.products, function(idx, element) {
                            if(item.productId == element.productId) {
                                $scope.productsSelection.push(labelObject);
                                $scope.merchant.products.push(wrappedObject);
                            }
                        });
                        self.original.products = $scope.merchant.products;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Merchants");
        };
        MerchantResource.get({MerchantId:$routeParams.MerchantId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.merchant);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.merchant.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Merchants");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Merchants");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.merchant.$remove(successCallback, errorCallback);
    };
    
    $scope.merchantEmailVerifiedList = [
        "true",  
        " false"  
    ];
    $scope.merchantFeaturesesSelection = $scope.merchantFeaturesesSelection || [];
    $scope.$watch("merchantFeaturesesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.merchant) {
            $scope.merchant.merchantFeatureses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.merchantFeaturesId = selectedItem.value;
                $scope.merchant.merchantFeatureses.push(collectionItem);
            });
        }
    });
    $scope.offersSelection = $scope.offersSelection || [];
    $scope.$watch("offersSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.merchant) {
            $scope.merchant.offers = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.offerId = selectedItem.value;
                $scope.merchant.offers.push(collectionItem);
            });
        }
    });
    $scope.merchantReviewsSelection = $scope.merchantReviewsSelection || [];
    $scope.$watch("merchantReviewsSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.merchant) {
            $scope.merchant.merchantReviews = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.merchantReviewId = selectedItem.value;
                $scope.merchant.merchantReviews.push(collectionItem);
            });
        }
    });
    $scope.merchantCategoriesSelection = $scope.merchantCategoriesSelection || [];
    $scope.$watch("merchantCategoriesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.merchant) {
            $scope.merchant.merchantCategories = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.merchantCategoryId = selectedItem.value;
                $scope.merchant.merchantCategories.push(collectionItem);
            });
        }
    });
    $scope.merchantAddressesSelection = $scope.merchantAddressesSelection || [];
    $scope.$watch("merchantAddressesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.merchant) {
            $scope.merchant.merchantAddresses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.merchantAddressId = selectedItem.value;
                $scope.merchant.merchantAddresses.push(collectionItem);
            });
        }
    });
    $scope.merchantPaymentGatewaysSelection = $scope.merchantPaymentGatewaysSelection || [];
    $scope.$watch("merchantPaymentGatewaysSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.merchant) {
            $scope.merchant.merchantPaymentGateways = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.merchantPaymentGatewayId = selectedItem.value;
                $scope.merchant.merchantPaymentGateways.push(collectionItem);
            });
        }
    });
    $scope.loyaltyProgramMerchantsSelection = $scope.loyaltyProgramMerchantsSelection || [];
    $scope.$watch("loyaltyProgramMerchantsSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.merchant) {
            $scope.merchant.loyaltyProgramMerchants = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.loyaltyProgramMerchantId = selectedItem.value;
                $scope.merchant.loyaltyProgramMerchants.push(collectionItem);
            });
        }
    });
    $scope.taxRuleMerchantsSelection = $scope.taxRuleMerchantsSelection || [];
    $scope.$watch("taxRuleMerchantsSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.merchant) {
            $scope.merchant.taxRuleMerchants = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.taxRuleMerchantId = selectedItem.value;
                $scope.merchant.taxRuleMerchants.push(collectionItem);
            });
        }
    });
    $scope.userFavouritesesSelection = $scope.userFavouritesesSelection || [];
    $scope.$watch("userFavouritesesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.merchant) {
            $scope.merchant.userFavouriteses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.userFavouriteId = selectedItem.value;
                $scope.merchant.userFavouriteses.push(collectionItem);
            });
        }
    });
    $scope.productsSelection = $scope.productsSelection || [];
    $scope.$watch("productsSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.merchant) {
            $scope.merchant.products = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.productId = selectedItem.value;
                $scope.merchant.products.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});