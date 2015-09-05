
angular.module('agilekartV2').controller('NewMerchantController', function ($scope, $location, locationParser, MerchantResource , MerchantFeaturesResource, OfferResource, MerchantReviewResource, MerchantCategoryResource, MerchantAddressResource, MerchantPaymentGatewayResource, LoyaltyProgramMerchantResource, TaxRuleMerchantResource, UserFavouritesResource, ProductResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.merchant = $scope.merchant || {};
    
    $scope.merchantEmailVerifiedList = [
        "true",
        " false"
    ];
    
    $scope.merchantFeaturesesList = MerchantFeaturesResource.queryAll(function(items){
        $scope.merchantFeaturesesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.merchantFeaturesId,
                text : item.merchantFeaturesId
            });
        });
    });
    $scope.$watch("merchantFeaturesesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.merchant.merchantFeatureses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.merchantFeaturesId = selectedItem.value;
                $scope.merchant.merchantFeatureses.push(collectionItem);
            });
        }
    });
    
    $scope.offersList = OfferResource.queryAll(function(items){
        $scope.offersSelectionList = $.map(items, function(item) {
            return ( {
                value : item.offerId,
                text : item.offerId
            });
        });
    });
    $scope.$watch("offersSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.merchant.offers = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.offerId = selectedItem.value;
                $scope.merchant.offers.push(collectionItem);
            });
        }
    });
    
    $scope.merchantReviewsList = MerchantReviewResource.queryAll(function(items){
        $scope.merchantReviewsSelectionList = $.map(items, function(item) {
            return ( {
                value : item.merchantReviewId,
                text : item.merchantReviewId
            });
        });
    });
    $scope.$watch("merchantReviewsSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.merchant.merchantReviews = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.merchantReviewId = selectedItem.value;
                $scope.merchant.merchantReviews.push(collectionItem);
            });
        }
    });
    
    $scope.merchantCategoriesList = MerchantCategoryResource.queryAll(function(items){
        $scope.merchantCategoriesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.merchantCategoryId,
                text : item.merchantCategoryId
            });
        });
    });
    $scope.$watch("merchantCategoriesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.merchant.merchantCategories = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.merchantCategoryId = selectedItem.value;
                $scope.merchant.merchantCategories.push(collectionItem);
            });
        }
    });
    
    $scope.merchantAddressesList = MerchantAddressResource.queryAll(function(items){
        $scope.merchantAddressesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.merchantAddressId,
                text : item.merchantAddressId
            });
        });
    });
    $scope.$watch("merchantAddressesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.merchant.merchantAddresses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.merchantAddressId = selectedItem.value;
                $scope.merchant.merchantAddresses.push(collectionItem);
            });
        }
    });
    
    $scope.merchantPaymentGatewaysList = MerchantPaymentGatewayResource.queryAll(function(items){
        $scope.merchantPaymentGatewaysSelectionList = $.map(items, function(item) {
            return ( {
                value : item.merchantPaymentGatewayId,
                text : item.merchantPaymentGatewayId
            });
        });
    });
    $scope.$watch("merchantPaymentGatewaysSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.merchant.merchantPaymentGateways = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.merchantPaymentGatewayId = selectedItem.value;
                $scope.merchant.merchantPaymentGateways.push(collectionItem);
            });
        }
    });
    
    $scope.loyaltyProgramMerchantsList = LoyaltyProgramMerchantResource.queryAll(function(items){
        $scope.loyaltyProgramMerchantsSelectionList = $.map(items, function(item) {
            return ( {
                value : item.loyaltyProgramMerchantId,
                text : item.loyaltyProgramMerchantId
            });
        });
    });
    $scope.$watch("loyaltyProgramMerchantsSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.merchant.loyaltyProgramMerchants = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.loyaltyProgramMerchantId = selectedItem.value;
                $scope.merchant.loyaltyProgramMerchants.push(collectionItem);
            });
        }
    });
    
    $scope.taxRuleMerchantsList = TaxRuleMerchantResource.queryAll(function(items){
        $scope.taxRuleMerchantsSelectionList = $.map(items, function(item) {
            return ( {
                value : item.taxRuleMerchantId,
                text : item.taxRuleMerchantId
            });
        });
    });
    $scope.$watch("taxRuleMerchantsSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.merchant.taxRuleMerchants = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.taxRuleMerchantId = selectedItem.value;
                $scope.merchant.taxRuleMerchants.push(collectionItem);
            });
        }
    });
    
    $scope.userFavouritesesList = UserFavouritesResource.queryAll(function(items){
        $scope.userFavouritesesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.userFavouriteId,
                text : item.userFavouriteId
            });
        });
    });
    $scope.$watch("userFavouritesesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.merchant.userFavouriteses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.userFavouriteId = selectedItem.value;
                $scope.merchant.userFavouriteses.push(collectionItem);
            });
        }
    });
    
    $scope.productsList = ProductResource.queryAll(function(items){
        $scope.productsSelectionList = $.map(items, function(item) {
            return ( {
                value : item.productId,
                text : item.productId
            });
        });
    });
    $scope.$watch("productsSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.merchant.products = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.productId = selectedItem.value;
                $scope.merchant.products.push(collectionItem);
            });
        }
    });
    
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "MER"+data.maxCount;
        	console.log(data);
        	$scope.merchant.merchantId = prmryKy;
        	$scope.merchant.lastUpdateUserId = "ABC";
            $scope.merchant.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/merchants');
		    catgry.save($scope.merchant, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"MER"}, successCallback, errorCallback);
    };

    $scope.save = function() {
    	$scope.getId();
    };
    
    $scope.cancel = function() {
        $location.path("/Merchants");
    };
});