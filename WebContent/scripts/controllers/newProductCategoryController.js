
angular.module('agilekartV2').controller('NewProductCategoryController', function ($scope, $location, locationParser, ProductCategoryResource , CategoryResource, ProductResource,SequenceKeyTableResource,$resource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.productCategory = $scope.productCategory || {};
    
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
            $scope.productCategory.category = {};
            $scope.productCategory.category.categoryId = selection.value;
        }
    });
    
    $scope.productList = ProductResource.queryAll(function(items){
        $scope.productSelectionList = $.map(items, function(item) {
            return ( {
                value : item.productId,
                text : item.productName
            });
        });
    });
    $scope.$watch("productSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.productCategory.product = {};
            $scope.productCategory.product.productId = selection.value;
        }
    });
    
    $scope.getId = function() {
        var successCallback = function(data, responseHeaders){
        	$scope.sequenceKeyTable = data;
        	var prmryKy = "PDTCAT"+data.maxCount;
        	console.log(data);
        	$scope.productCategory.productCategoryId = prmryKy;
        	$scope.productCategory.lastUpdateUserId = "ABC";
            $scope.productCategory.lastUpdateTs = new Date();
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
            
            var catgry = $resource('http://localhost:8080/AgileKart2Rest/rest/productcategories');
		    catgry.save($scope.productCategory, successCallback1, errorCallback1);
        };
        var errorCallback = function() {
           
        };
        SequenceKeyTableResource.get({SequenceKeyTableId:"PDTCAT"}, successCallback, errorCallback);
    };

    $scope.save = function() {
    	$scope.getId();  
    };
    
    $scope.cancel = function() {
        $location.path("/ProductCategories");
    };
});