
angular.module('agilekartV2').controller('NewProductController', function ($scope, $location, locationParser, ProductResource , MerchantResource, ProductOptionResource, ProductReviewResource, ProductCategoryResource, OrderDetailsResource, OfferResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.product = $scope.product || {};
    
    $scope.merchantList = MerchantResource.queryAll(function(items){
        $scope.merchantSelectionList = $.map(items, function(item) {
            return ( {
                value : item.merchantId,
                text : item.merchantName
            });
        });
    });
    $scope.$watch("merchantSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.product.merchant = {};
            $scope.product.merchant.merchantId = selection.value;
        }
    });
    
    $scope.productUnlimitedList = [
        "true",
        " false"
    ];
    
    $scope.productOptionsList = ProductOptionResource.queryAll(function(items){
        $scope.productOptionsSelectionList = $.map(items, function(item) {
            return ( {
                value : item.productOptionId,
                text : item.productOptionName
            });
        });
    });
    $scope.$watch("productOptionsSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.product.productOptions = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.productOptionId = selectedItem.value;
                $scope.product.productOptions.push(collectionItem);
            });
        }
    });
    
    $scope.productReviewsList = ProductReviewResource.queryAll(function(items){
        $scope.productReviewsSelectionList = $.map(items, function(item) {
            return ( {
                value : item.productReviewId,
                text : item.productReviewName
            });
        });
    });
    $scope.$watch("productReviewsSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.product.productReviews = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.productReviewId = selectedItem.value;
                $scope.product.productReviews.push(collectionItem);
            });
        }
    });
    
    $scope.productCategoriesList = ProductCategoryResource.queryAll(function(items){
        $scope.productCategoriesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.productCategoryId,
                text : item.productCategoryName
            });
        });
    });
    $scope.$watch("productCategoriesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.product.productCategories = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.productCategoryId = selectedItem.value;
                $scope.product.productCategories.push(collectionItem);
            });
        }
    });
    
    $scope.orderDetailsesList = OrderDetailsResource.queryAll(function(items){
        $scope.orderDetailsesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.detailId,
                text : item.detailName
            });
        });
    });
    $scope.$watch("orderDetailsesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.product.orderDetailses = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.detailId = selectedItem.value;
                $scope.product.orderDetailses.push(collectionItem);
            });
        }
    });
    
    $scope.offersList = OfferResource.queryAll(function(items){
        $scope.offersSelectionList = $.map(items, function(item) {
            return ( {
                value : item.offerId,
                text : item.offerName
            });
        });
    });
    $scope.$watch("offersSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.product.offers = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.offerId = selectedItem.value;
                $scope.product.offers.push(collectionItem);
            });
        }
    });
    
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "PDT"+data.maxCount;
        	console.log(data);
        	$scope.product.productId = prmryKy;
        	$scope.product.lastUpdateUserId = "ABC";
            $scope.product.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/products');
		    catgry.save($scope.product, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"PDT"}, successCallback, errorCallback);
    };

    $scope.save = function() {
    	$scope.getId();  
    };
    
    $scope.cancel = function() {
        $location.path("/Products");
    };
});