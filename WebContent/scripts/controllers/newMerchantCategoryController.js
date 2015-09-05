
angular.module('agilekartV2').controller('NewMerchantCategoryController', function ($scope, $location, locationParser, MerchantCategoryResource , CategoryResource, MerchantResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.merchantCategory = $scope.merchantCategory || {};
    
    $scope.categoryList = CategoryResource.queryAll(function(items){
        $scope.categorySelectionList = $.map(items, function(item) {
            return ( {
                value : item.categoryId,
                text : item.categoryName
            });
        });
    });
    $scope.$watch("categorySelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.merchantCategory.category = {};
            $scope.merchantCategory.category.categoryId = selection.value;
        }
    });
    
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
            $scope.merchantCategory.merchant = {};
            $scope.merchantCategory.merchant.merchantId = selection.value;
        }
    });
    
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "MERCAT"+data.maxCount;
        	console.log(data);
        	$scope.merchantCategory.merchantCategoryId = prmryKy;
        	$scope.merchantCategory.lastUpdateUserId = "ABC";
            $scope.merchantCategory.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/merchantcategories');
		    catgry.save($scope.merchantCategory, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"MERCAT"}, successCallback, errorCallback);
    };

    $scope.save = function() {
     	$scope.getId();
    };
    
    $scope.cancel = function() {
        $location.path("/MerchantCategories");
    };
});